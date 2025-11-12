package service

import (
	"io"
	"mime/multipart"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"
	"github.com/satya-18-w/go-TODO_TASKER/internal/errs"
	"github.com/satya-18-w/go-TODO_TASKER/internal/lib/aws"
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
	awsClient *aws.AWS
}

func NewTodoService(s *server.Server, todorepo *repository.TodoRepository, categoryRepo *repository.CategoryRepository, awsClient *aws.AWS) *TodoService {
	return &TodoService{server: s,
		todoRepo:     todorepo,
		categoryRepo: categoryRepo,
		awsClient:    awsClient,
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

func (s *TodoService) UploadTodoAttachment(ctx echo.Context, userID string, todoID uuid.UUID, file *multipart.FileHeader) (*todo.Todo_Attachment, error) {
	logger := middleware.GetLogger(ctx)
	// verify todolist exists or not and belong to user
	_, err := s.todoRepo.CheckTodoExists(ctx.Request().Context(), userID, todoID)
	if err != nil {
		logger.Error().Err(err).Msg("Todo Validation Failed")
		return nil, err
	}

	// Open Uploaded File
	src, err := file.Open()
	if err != nil {
		logger.Error().Err(err).Msg("Failed to open uploaded file")
		return nil, errs.NewBadRequestError("Failed to open uploaded file", false, nil, nil, nil)
	}
	defer src.Close()

	// uplod file to s3
	fileKey, err := s.awsClient.S3.UploadFile(ctx.Request().Context(), s.server.Config.AWS.UploadBucket, "todos/attachments/"+file.Filename, src)
	if err != nil {
		logger.Error().Err(err).Msg("Failed to uplad the file to s3")
		return nil, errors.Wrap(err, "Failed to upload the file to s3")
	}
	// Detect Mime type
	src, err = file.Open()
	if err != nil {
		logger.Error().Err(err).Msg("failed to reopen file for MIME detection")
		return nil, errs.NewBadRequestError("failed to process file", false, nil, nil, nil)
	}
	defer src.Close()

	buffer := make([]byte, 512)
	n, err := src.Read(buffer)
	if err != nil && err != io.EOF {
		logger.Error().Err(err).Msg("Failed to read file for Mime detection")
		return nil, errs.NewBadRequestError("Failed to process process file", false, nil, nil, nil)
	}

	mimeType := http.DetectContentType(buffer[:n])
	// Create attachment record in db
	attachment, err := s.todoRepo.UploadTodoAttachment(
		ctx.Request().Context(),
		todoID,
		userID,
		fileKey,
		file.Filename,
		file.Size,
		mimeType,
	)
	if err != nil {
		logger.Error().Err(err).Msg("Failed to create attachment record")
		return nil, err
	}
	logger.Info().
		Str("attachment_id", attachment.ID.String()).
		Str("s3_key", fileKey).
		Msg("uploaded todo attachment")

	return attachment, nil

}

func (s *TodoService) DeleteTodoAttachment(
	ctx echo.Context,
	userID string,
	todoID uuid.UUID,
	attachmentID uuid.UUID,
) error {
	logger := middleware.GetLogger(ctx)

	// Verify todo exists and belongs to user
	_, err := s.todoRepo.CheckTodoExists(ctx.Request().Context(), userID, todoID)
	if err != nil {
		logger.Error().Err(err).Msg("todo validation failed")
		return err
	}

	// Get attachment details for S3 deletion
	attachment, err := s.todoRepo.GetTodoAttachment(
		ctx.Request().Context(),
		todoID,
		attachmentID,
	)
	if err != nil {
		logger.Error().Err(err).Msg("failed to get attachment details")
		return err
	}

	// Delete attachment record
	err = s.todoRepo.DeleteTodoAttachment(
		ctx.Request().Context(),
		todoID,
		attachmentID,
	)
	if err != nil {
		logger.Error().Err(err).Msg("failed to delete attachment record")
		return err
	}

	// Delete from S3 asynchronously
	go func() {
		err := s.awsClient.S3.DeleteObject(
			ctx.Request().Context(),
			s.server.Config.AWS.UploadBucket,
			attachment.DownloadKey,
		)
		if err != nil {
			s.server.Logger.Error().
				Err(err).
				Str("s3_key", attachment.DownloadKey).
				Msg("failed to delete attachment from S3")
		}
	}()

	logger.Info().Msg("deleted todo attachment")

	return nil
}

func (s *TodoService) GetTodoAttachmentPresignedUrl(
	ctx echo.Context,
	userID string,
	todoID uuid.UUID,
	attachmentId uuid.UUID,

) (string, error) {
	logger := middleware.GetLogger(ctx)
	// Verify todo Exists or not
	_, err := s.todoRepo.CheckTodoExists(ctx.Request().Context(), userID, todoID)
	if err != nil {
		logger.Error().Err(err).Msg("todo validation failed")
		return "", err
	}
	attachment, err := s.todoRepo.GetTodoAttachment(ctx.Request().Context(), todoID, attachmentId)
	if err != nil {
		logger.Error().Err(err).Msg("Failed to get attachment details")
		return "", err
	}

	// Generate Presigned url from s3
	presignedURL, err := s.awsClient.S3.CreatePresinedUrl(ctx.Request().Context(), s.server.Config.AWS.UploadBucket, attachment.DownloadKey)
	if err != nil {
		logger.Error().Err(err).Msg("Failed to generate the Presigned URL")
		return "", err
	}

	return presignedURL, nil

}
