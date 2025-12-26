package cron

import (
	"context"
	"fmt"

	"github.com/hibiken/asynq"
	"github.com/redis/go-redis/v9"
	"github.com/satya-18-w/go-TODO_TASKER/internal/config"
	"github.com/satya-18-w/go-TODO_TASKER/internal/database"
	"github.com/satya-18-w/go-TODO_TASKER/internal/logger"
	"github.com/satya-18-w/go-TODO_TASKER/internal/repository"
	"github.com/satya-18-w/go-TODO_TASKER/internal/server"
)

type JobContext struct {
	Config        *config.Config
	Server        *server.Server
	JobClient     *asynq.Client
	Repositories  *repository.Repositories
	Loggerservice *logger.LoggerService
}

func NewJobContext() (*JobContext, error) {
	cfg, err := config.LoadConfig()
	if err != nil {
		return nil, fmt.Errorf("Failed to load Config: %w", err)
	}
	loggerService := logger.NewLoggerService(cfg.Observability)
	loggerInstance := logger.NewLoggerWithService(cfg.Observability, loggerService)
	db, err := database.New(cfg, &loggerInstance, loggerService)
	if err != nil {
		return nil, fmt.Errorf("Failed to initialize database: %w", err)
	}
	redisClient := redis.NewClient(&redis.Options{
		Addr:     cfg.Redis.Address,
		Password: cfg.Redis.Password,
		DB:       cfg.Redis.DB,
	})
	srv := &server.Server{
		Config:        cfg,
		Logger:        &loggerInstance,
		LoggerService: loggerService,
		DB:            db,
		Redis:         redisClient,
	}
	jobClient, err := initJobClient(cfg)
	if err != nil {
		return nil, fmt.Errorf("Failed to initialize job client: %w", err)
	}
	repositories := repository.NewRepositories(srv)

	return &JobContext{
		Config:        cfg,
		Server:        srv,
		JobClient:     jobClient,
		Repositories:  repositories,
		Loggerservice: loggerService,
	}, nil

}

func (c *JobContext) Close() {
	if c.Server != nil && c.Server.DB != nil {
		c.Server.DB.Pool.Close()
	}
	if c.Server != nil && c.Server.Redis != nil {
		c.Server.Redis.Close()

	}
	if c.JobClient != nil {
		c.JobClient.Close()
	}
	if c.Loggerservice != nil {
		c.Loggerservice.Shutdown()
	}
}

func initJobClient(cfg *config.Config) (*asynq.Client, error) {
	redisOpt := asynq.RedisClientOpt{
		Addr:     cfg.Redis.Address,
		Password: cfg.Redis.Password,
		DB:       cfg.Redis.DB,
	}

	client := asynq.NewClient(redisOpt)
	return client, nil
}

type Job interface {
	Name() string
	Description() string
	Run(ctx context.Context, jobCtx *JobContext) error
}

type JobRunner struct {
	job Job
	ctx *JobContext
}

func NewJobRunner(job Job) (*JobRunner, error) {
	ctx, err := NewJobContext()
	if err != nil {
		return nil, fmt.Errorf("failed to create job context: %w", err)
	}

	return &JobRunner{
		job: job,
		ctx: ctx,
	}, nil
}

func (r *JobRunner) Run() error {
	defer r.ctx.Close()

	r.ctx.Server.Logger.Info().
		Str("job", r.job.Name()).
		Msg("Starting cron job")

	ctx := context.Background()
	r.job.Run(ctx, r.ctx)

	r.ctx.Server.Logger.Info().
		Str("job", r.job.Name()).
		Msg("Cron job completed successfully")
	return nil
}
