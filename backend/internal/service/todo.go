package service

import (
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/satya-18-w/go-TODO_TASKER/internal/errs"
	"github.com/satya-18-w/go-TODO_TASKER/internal/middleware"
	"github.com/satya-18-w/go-TODO_TASKER/internal/model"
	"github.com/satya-18-w/go-TODO_TASKER/internal/model/todo"
	"github.com/satya-18-w/go-TODO_TASKER/internal/repository"
	"github.com/satya-18-w/go-TODO_TASKER/internal/server"
)

type TodoService struct {
	server       *server.Server
	todoRepo     *repository.TodoRepository
	categoryRepo *repository.CategoryRepository
	// Aws part will be add later
	// awsClient *aws.Aws
}

func NewTodoService(s *server.Server, todorepo *repository.TodoRepository, categoryRepo *repository.CategoryRepository) *TodoService {
	return &TodoService{server: s,
		todoRepo:     todorepo,
		categoryRepo: categoryRepo,
		// awsClient:    awsClient,
	}
}

func (t *TodoService) CreateTodo(ctx echo.Context, userID string, payload *todo.CreateTodoPayload) (*todo.Todo, error) {
	logger := middleware.GetLogger(ctx)

	// Validate parent todo exists and belongs to user (if provided )

	if payload.ParentTodoID != nil {
		parentTodo, err := t.todoRepo.CheckTodoExists(ctx.Request().Context(), userID, *payload.ParentTodoID)
		if err != nil {
			logger.Error().Err(err).Msg("Parent todo Validation Failed.")
			return nil, err
		}

		if !parentTodo.CanHaveChildren() {
			err := errs.NewBadRequestError("Parent todo cannot have children (subtasks can not have subtasks)", false, nil, nil, nil)

			logger.Error().Err(err).Msg("Parent todo validation Failed")
			return nil, err
		}
	}
	// Validate category exists and belonging to user(if provided)
	if payload.CategoryID != nil {
		_, err := t.categoryRepo.GetCategoryByID(ctx.Request().Context(), userID, *payload.CategoryID)
		if err != nil {
			logger.Error().Err(err).Msg("Category validation failed.")
			return nil, err
		}

	}

	todo, err := t.todoRepo.CreateTodo(ctx.Request().Context(), userID, payload)
	if err != nil {
		logger.Error().Err(err).Msg("Failed to create Todo")
		return nil, err
	}

	//Bussiness event logic
	eventlogger := middleware.GetLogger(ctx)
	eventlogger.Info().
		Str("event", "todo_created").
		Str("todo_id", todo.ID.String()).
		Str("title", todo.Title).
		Str("category_id", func() string {
			if todo.CategoryID != nil {
				return todo.CategoryID.String()
			}
			return ""
		}()).
		Str("Priority", string(todo.Priority)).Msg("Todo Created successfully")

	return todo, nil
}

func (t *TodoService) GetTodoByID(ctx echo.Context, userId string, todoID uuid.UUID) (*todo.PopulatedTodo, error) {
	logger := middleware.GetLogger(ctx)

	todo, err := t.todoRepo.GetTodoByID(ctx.Request().Context(), userId, todoID)
	if err != nil {
		logger.Error().Err(err).Msg("Failed to get Todo by ID")
		return nil, err
	}

	return todo, nil
}

func (t *TodoService) GetTodos(ctx echo.Context, userID string, query *todo.GetTodoQuery) (*model.PaginatedResponse[todo.PopulatedTodo], error) {
	logger := middleware.GetLogger(ctx)

	res, err := t.todoRepo.GetTodos(ctx.Request().Context(), userID, query)
	if err != nil {
		logger.Error().Err(err).Msg("Failed to Get Todos")
	}

	return res, nil
}

func (t *TodoService) UpdateTodo(ctx echo.Context, userId string, payload *todo.UpdateTodoPayload) (*todo.Todo, error) {
	logger := middleware.GetLogger(ctx)

	// Validate parent todo exists and belongs to user(if provided)
	if payload.ParentTodoID != nil {
		parenttodo, err := t.todoRepo.CheckTodoExists(ctx.Request().Context(), userId, *payload.ParentTodoID)
		if err != nil {
			logger.Error().Err(err).Msg("Parent todo validation failed")
			return nil, err

		}
		if parenttodo.ID == payload.ID {
			logger.Warn().Msg("Todo Cannot be its parent")
			return nil, errs.NewBadRequestError("Todo cannot be its parent ", false, nil, nil, nil)
		}
		if !parenttodo.CanHaveChildren() {
			err := errs.NewBadRequestError("Parent todo cannot have children (subtasks can't have subtasks)", false, nil, nil, nil)
			logger.Warn().Msg("parent todo cannot have children")
			return nil, err
		}

		logger.Debug().Msg("Parent todo validation passed")
	}

	// Validate category exists and belongs to user (if provided)
	if payload.CategoryID != nil {
		_, err := t.categoryRepo.GetCategoryByID(ctx.Request().Context(), userId, *payload.CategoryID)
		if err != nil {
			logger.Error().Err(err).Msg("Category validation failed")
			return nil, err
		}

		logger.Debug().Msg("Category Validation passed")

	}
	updatedTodo, err := t.todoRepo.UpdateTodo(ctx.Request().Context(), userId, payload)
	if err != nil {
		logger.Error().Err(err).Msg("Failed to Update Todo")
		return nil, err
	}

	// Bussiness event log
	eventLogger := middleware.GetLogger(ctx)
	eventLogger.Info().
		Str("Event", "Todo_updated").
		Str("todo_id", updatedTodo.ID.String()).
		Str("Title", updatedTodo.Title).
		Str("Category_id", func() string {
			if updatedTodo.CategoryID != nil {
				return updatedTodo.CategoryID.String()
			}
			return ""

		}()).
		Str("Priority", string(updatedTodo.Priority)).
		Str("Status", string(updatedTodo.Status)).
		Msg("Todo Updated Successfully")

	return updatedTodo, nil

}

func (s *TodoService) DeleteTodo(ctx echo.Context, userID string, payload *todo.DeleteTodoPayload) error {
	logger := middleware.GetLogger(ctx)

	err := s.todoRepo.DeleteTodo(ctx.Request().Context(), userID, payload)
	if err != nil {
		logger.Error().Err(err).Msg("failed to delete todo")
		return err
	}

	// Business event log
	eventLogger := middleware.GetLogger(ctx)
	eventLogger.Info().
		Str("event", "todo_deleted").
		Str("todo_id", payload.Id.String()).
		Msg("Todo deleted successfully")

	return nil
}

func (s *TodoService) GetTodoStats(ctx echo.Context, userID string) (*todo.TodoStats, error) {
	logger := middleware.GetLogger(ctx)

	stats, err := s.todoRepo.GetTodoStats(ctx.Request().Context(), userID)
	if err != nil {
		logger.Error().Err(err).Msg("failed to fetch todo statistics")
		return nil, err
	}

	return stats, nil
}

// -----------------------------------------------Attachment Parts------------------------------------------------
