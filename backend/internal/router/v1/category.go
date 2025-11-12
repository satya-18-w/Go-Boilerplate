package v1

import (
	"github.com/labstack/echo/v4"
	"github.com/satya-18-w/go-TODO_TASKER/internal/handler"
	"github.com/satya-18-w/go-TODO_TASKER/internal/middleware"
)

func registerCategoryRouter(r *echo.Group, h *handler.CategoryHandler, auth *middleware.AuthMiddleware) {
	// Category Operations
	categories := r.Group("/categories")
	categories.Use(auth.RequireAuth)

	// Category Collection Opeerations
	categories.POST("", h.CreateCategory)
	categories.GET("", h.GetCategories)

	// Indivisual Category Operations
	dynamicCategory := categories.Group("/:id")
	dynamicCategory.PATCH("", h.UpdateCategory)
	dynamicCategory.DELETE("", h.DeleteCategory)

}
