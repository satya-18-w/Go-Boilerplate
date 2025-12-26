package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/satya-18-w/go-TODO_TASKER/internal/config"
	"github.com/satya-18-w/go-TODO_TASKER/internal/database"
	"github.com/satya-18-w/go-TODO_TASKER/internal/handler"
	"github.com/satya-18-w/go-TODO_TASKER/internal/logger"
	"github.com/satya-18-w/go-TODO_TASKER/internal/repository"
	"github.com/satya-18-w/go-TODO_TASKER/internal/router"
	"github.com/satya-18-w/go-TODO_TASKER/internal/server"
	"github.com/satya-18-w/go-TODO_TASKER/internal/service"
)

const DefaultContextTimeout = 30

func main() {
	// Loading the configfile
	cfg, err := config.LoadConfig()
	if err != nil {
		panic("failed to load the config" + err.Error())

	}

	// Initialize new relic server
	fmt.Println("Initializing New Relic/Logger Service...")
	loggerservice := logger.NewLoggerService(cfg.Observability)
	fmt.Println("Logger Service initialized. creating main logger...")
	defer loggerservice.Shutdown()
	log := logger.NewLoggerWithService(cfg.Observability, loggerservice)
	fmt.Println("Main Logger created. Starting migration...")

	// Run database migrations
	migrationCtx, migrationCancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer migrationCancel()
	if err := database.Migrate(migrationCtx, log, cfg); err != nil {
		log.Error().Err(err).Msg("Failed to database Migrate - Continuing startup")
	}

	// Initialize server
	server, err := server.New(cfg, &log, loggerservice)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to initialize server")

	}

	// Initialize repositories , sevices and handlers

	repos := repository.NewRepositories(server)
	services, serviceErr := service.NewServices(server, repos)
	if serviceErr != nil {
		log.Fatal().Err(err).Msg("Could not create services")
	}

	handlers := handler.NewHandlers(server, services)

	// Initialize router

	r := router.NewRouter(server, handlers, services)

	// setup  HTTP Server
	server.SetupHTTPServer(r)

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)

	// Start server
	go func() {
		if err := server.Start(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatal().Err(err).Msg("failed to start server")
		}
	}()
	// wait for interupt signal to greacefully shotdown the server

	<-ctx.Done()
	ctx, cancel := context.WithTimeout(context.Background(), DefaultContextTimeout*time.Second)

	if err = server.Shutdown(ctx); err != nil {
		log.Fatal().Err(err).Msg("Server forced to shutdown!")
	}

	stop()
	cancel()
	log.Info().Msg("server exited properly")

}
