package handler

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/satya-18-w/go-TODO_TASKER/internal/middleware"
	"github.com/satya-18-w/go-TODO_TASKER/internal/model"
	"github.com/satya-18-w/go-TODO_TASKER/internal/model/category"
	"github.com/satya-18-w/go-TODO_TASKER/internal/server"
	"github.com/satya-18-w/go-TODO_TASKER/internal/service"
)

type CategoryHandler struct {
	Handler
	categoryService *service.CategoryService
}

func NewCategoryHandler(s *server.Server, categoryService *service.CategoryService) *CategoryHandler {
	return &CategoryHandler{
		Handler:         NewHandler(s),
		categoryService: categoryService,
	}
}

func (h *CategoryHandler) CreateCategory(c echo.Context) error {
	return Handle(
		h.Handler,
		func(c echo.Context, payload *category.CreateCategoryPayload) (*category.Category, error) {
			userID := middleware.GetUserID(c)
			return h.categoryService.CreateCategory(c, userID, payload)
		},
		http.StatusCreated,
		&category.CreateCategoryPayload{},
	)(c)
}

func (h *CategoryHandler) GetCategories(c echo.Context) error {
	return Handle(
		h.Handler,
		func(c echo.Context, query *category.GetAllCategoriesQuery) (
			*model.PaginatedResponse[category.Category], error,
		) {
			userID := middleware.GetUserID(c)
			return h.categoryService.GetCategories(c, userID, query)
		},
		http.StatusOK,
		&category.GetAllCategoriesQuery{},
	)(c)

}

func (h *CategoryHandler) UpdateCategory(c echo.Context) error {
	return Handle(
		h.Handler,
		func(c echo.Context, payload *category.UpdateCategoryPayload) (*category.Category, error) {
			userID := middleware.GetUserID(c)
			categoryID, err := uuid.Parse(payload.ID)
			if err != nil {
				return nil, err
			}
			return h.categoryService.UpdateCategory(c, userID, categoryID, payload)
		},
		http.StatusOK,
		&category.UpdateCategoryPayload{},
	)(c)
}


func (h *CategoryHandler) DeleteCategory(c echo.Context) error {
	return HandleNoContent(
		h.Handler,
		func(c echo.Context, payload *category.DeleteCategoryPayload) error {
			userID := middleware.GetUserID(c)
			return h.categoryService.DeleteCategory(c, userID, payload.ID)
		},
		http.StatusNoContent,
		&category.DeleteCategoryPayload{},
	)(c)
}