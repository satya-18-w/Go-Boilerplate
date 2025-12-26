package comment

import (
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type AddCommentPayload struct {
	TodoID  uuid.UUID `param:"id" validate:"required,uuid"`
	Content string    `json:"content" validate:"required,min=1,max=1000"`
}

func (a *AddCommentPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(a)
}

type GetCommentsByTodoIDPayload struct {
	TodoID uuid.UUID `param:"id" validate:"required,uuid"`
}

func (g *GetCommentsByTodoIDPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(g)
}

type UpdateCommentPayload struct {
	ID      uuid.UUID `param:"id" validate:"required,uuid"`
	Content string    `json:"content" validate:"required,min=1,max=255"`
}

func (u *UpdateCommentPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(u)
}

type DeleteCommentPayload struct {
	ID uuid.UUID `param:"id" validate:"required,uuid"`
}

func (c *DeleteCommentPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(c)
}
