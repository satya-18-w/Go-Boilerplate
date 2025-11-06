package service

import (
	"github.com/labstack/echo/v4"
	"github.com/satya-18-w/go-TODO_TASKER/internal/middleware"
	"github.com/satya-18-w/go-TODO_TASKER/internal/model/todo"
	"github.com/satya-18-w/go-TODO_TASKER/internal/repository"
	"github.com/satya-18-w/go-TODO_TASKER/internal/server"
)

type TodoService struct {
	server       *server.Server
	todoRepo     *repository.TodoRepository
	categoryRepo *repository.CategoryRepository
	// Aws part will be add later
	awsClient *aws.Aws
}

func NewTodoService(s *server.Server, todorepo *repository.TodoRepository, categoryRepo *repository.CategoryRepository, awsClient *aws.Aws) *TodoService {
	return &TodoService{server: s,
		todoRepo:     todorepo,
		categoryRepo: categoryRepo,
		awsClient:    awsClient,
	}
}

func (t *TodoService) CreateTodo(ctx echo.Context, userID string, payload *todo.CreateTodoPayload) (*todo.Todo,error){
	logger:=middleware.GetLogger(ctx)

	// Validate parent todo exists and belongs to user (if provided )
	
}
