package v1

import (
	"github.com/labstack/echo/v4"
	"github.com/satya-18-w/go-TODO_TASKER/internal/handler"
	"github.com/satya-18-w/go-TODO_TASKER/internal/middleware"
)

func RegisterV1Routes(router *echo.Group, handlers *handler.Handlers, auth *middleware.Middlewares) {
	// Register Todo Routes
	registerTodoRouter(router, handlers.Todo, handlers.Comment, auth.Auth)

	// Register Comment Routes
	registerCommentRouter(router, handlers.Comment, auth.Auth)

	// Register Category Routes
	// Register Category Routes
	registerCategoryRouter(router, handlers.Category, auth.Auth)

	// Register Webhook Routes
	registerWebhookRouter(router, handlers.Webhook)
}
