package service

import (
	"github.com/satya-18-w/go-TODO_TASKER/internal/lib/job"
	"github.com/satya-18-w/go-TODO_TASKER/internal/repository"
	"github.com/satya-18-w/go-TODO_TASKER/internal/server"
)

type Services struct {
	Auth *AuthService
	Job  *job.JobService
	Todo *TodoService
	Comment *CommentService
	Category *CategoryService
}

func NewServices(s *server.Server, repos *repository.Repositories) (*Services, error) {
	authService := NewAuthService(s)
	s.Job.SetAuthService(authService)

	return &Services{
		Auth: authService,
		Job:  s.Job,
		Todo: NewTodoService(s,repos.Todo ,repos.Category),
		Comment: NewCommentService(s, repos.Comment,repos.Todo),
		Category: NewCategoryService(s,repos.Category),
	}, nil

}
