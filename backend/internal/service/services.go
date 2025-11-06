package service

import (
	"github.com/satya-18-w/go-TODO_TASKER/internal/lib/job"
	"github.com/satya-18-w/go-TODO_TASKER/internal/repository"
	"github.com/satya-18-w/go-TODO_TASKER/internal/server"
)

type Services struct {
	Auth *AuthService
	Job  *job.JobService
}

func NewServices(s *server.Server, repos *repository.Repositories) (*Services, error) {
	authService := NewAuthService(s)
	return &Services{
		Auth: authService,
		Job:  s.Job,
	}, nil

}
