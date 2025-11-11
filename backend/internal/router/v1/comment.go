package v1

import (
	"github.com/labstack/echo/v4"
	"github.com/satya-18-w/go-TODO_TASKER/internal/handler"
	"github.com/satya-18-w/go-TODO_TASKER/internal/middleware"
)

func registerCommentRouter(r *echo.Group, h *handler.CommentHandler, auth *middleware.AuthMiddleware) {
	// Comment Operations
	comments := r.Group("/comments")
	comments.Use(auth.RequireAuth)

	// Indivisual comments Operations
	dynamicComment := comments.Group("/:id")
	dynamicComment.PATCH("", h.UpdateComment)
	dynamicComment.DELETE("", h.DeleteComment)

}
