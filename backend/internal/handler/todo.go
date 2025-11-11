package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/satya-18-w/go-TODO_TASKER/internal/middleware"
	"github.com/satya-18-w/go-TODO_TASKER/internal/model"
	"github.com/satya-18-w/go-TODO_TASKER/internal/model/todo"
	"github.com/satya-18-w/go-TODO_TASKER/internal/server"
	"github.com/satya-18-w/go-TODO_TASKER/internal/service"
)

type TodoHandler struct {
	Handler
	TodoService *service.TodoService
}

func NewTodoHandler(s *server.Server, todoService *service.TodoService) *TodoHandler {
	return &TodoHandler{
		Handler:     NewHandler(s),
		TodoService: todoService,
	}
}

func (h *TodoHandler) CreateTodo(c echo.Context) error {
	return Handle(h.Handler,
		func(c echo.Context, payload *todo.CreateTodoPayload) (*todo.Todo, error) {
			userId := middleware.GetUserID(c)
			return h.TodoService.CreateTodo(c, userId, payload)
		},
		http.StatusCreated,
		&todo.CreateTodoPayload{},
	)(c)
}

func (h *TodoHandler) GetTodoByID(c echo.Context) error {
	return Handle(h.Handler,
		func(c echo.Context, payload *todo.GetTodoByIDPayload) (*todo.PopulatedTodo, error) {
			userID := middleware.GetUserID(c)
			return h.TodoService.GetTodoByID(c, userID, payload.ID)

		},
		http.StatusOK,
		&todo.GetTodoByIDPayload{},
	)(c)
}

func (h *TodoHandler) GetTodos(c echo.Context) error {
	return Handle(
		h.Handler,
		func(c echo.Context, query *todo.GetTodoQuery) (*model.PaginatedResponse[todo.PopulatedTodo], error) {
			userID := middleware.GetUserID(c)
			return h.TodoService.GetTodos(c, userID, query)
		},
		http.StatusOK,
		&todo.GetTodoQuery{},
	)(c)
}


func (h *TodoHandler) UpdateTodo(c echo.Context) error {
	return Handle(
		h.Handler,
		func(c echo.Context, payload *todo.UpdateTodoPayload) (*todo.Todo, error) {
			userID := middleware.GetUserID(c)
			return h.TodoService.UpdateTodo(c, userID, payload)
		},
		http.StatusOK,
		&todo.UpdateTodoPayload{},
	)(c)
}


func (h *TodoHandler) DeleteTodo(c echo.Context) error {
	return HandleNoContent(
		h.Handler,
		func(c echo.Context, payload *todo.DeleteTodoPayload) error {
			userID := middleware.GetUserID(c)
			return h. TodoService.DeleteTodo(c, userID, payload)
		},
		http.StatusNoContent,
		&todo.DeleteTodoPayload{},
	)(c)
}


func (h *TodoHandler) GetTodoStats(c echo.Context) error {
	return Handle(
		h.Handler,
		func(c echo.Context, payload *todo.GetTodoStatsPayload) (*todo.TodoStats, error) {
			userID := middleware.GetUserID(c)
			return h.TodoService.GetTodoStats(c, userID)
		},
		http.StatusOK,
		&todo.GetTodoStatsPayload{},
	)(c)
}


