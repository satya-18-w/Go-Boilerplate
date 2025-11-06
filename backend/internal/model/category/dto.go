package category

import (
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

// -------------------------------------------------------------------------------
type CreateCategoryPayload struct {
	Name        string  `json:"name" validate:"required,min=1,max=100"`
	Color       *string `json:"color" validate:"required,min=3,max=20"`
	Description *string `json:"description" validate:"omitempty,min=1,max=255"`
}

func (c *CreateCategoryPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(c)
}

////-------------------------------------------------------------------------------------------------------------------------

type UpdateCategoryPayload struct {
	ID          string  `param:"id" validate:"required,uuid"`
	Name        *string `json:"name" validate:"omitempty,min=1,max=100"`
	Color       *string `json:"color" validate:"omitempty:"min=3,max=20"`
	Description *string `json:"description" validate:"omitempty,min=1,max=255"`
}

func (u *UpdateCategoryPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(u)
}

type GetAllCategoriesQuery struct {
	Page   *int    `query:"page" validate:"omitempty,min=1"`
	Limit  *int    `query:"limit" validate:"omitempty,min=1,max=100"`
	Sort   *string `query:"sort" validate:"omitempty,oneof=created_at updated_at name"`
	Order  *string `query:"order" validate:"omitempty,oneof=asc desc"`
	Search *string `query:"search" validate:"omitempty,min=1"`
}

func (q *GetAllCategoriesQuery) Validate() error {
	validate := validator.New()
	if err := validate.Struct(q); err != nil {
		return nil
	}

	// Set defaulkt for Paginations
	if q.Page == nil {
		defaultpage := 1
		q.Page = &defaultpage
	}
	if q.Limit == nil {
		defaultlimit := 20
		q.Limit = &defaultlimit
	}
	if q.Sort == nil {
		defaultsort := "name"
		q.Sort = &defaultsort
	}
	if q.Order == nil {
		defaultorder := "desc"
		q.Order = &defaultorder
	}
	return nil

}

type DeleteCategoryPayload struct {
	ID uuid.UUID `param:"id" validate:"required,uuid"`
}

func (p *DeleteCategoryPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(p)
}
