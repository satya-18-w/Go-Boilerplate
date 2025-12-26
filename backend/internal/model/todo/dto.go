package todo

import (
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

//  write dto related code here
// what are all the io structs

// ---------------------------------------------------------------------------
// Creating a TODO POST METHOD  in request BODY
type CreateTodoPayload struct {
	Title        string     `json:"title" validate:"required,min=1,max=255"`
	Description  *string    `json:"description" validate:"omitempty,max=1000"`
	Priority     *Priority  `json:"priority" validate:"omitempty,oneof=low medium high"`
	DueDate      *time.Time `json:"dueDate" validate:"omitempty"`
	ParentTodoID *uuid.UUID `json:"parentTodoId" validate:"omitempty,uuid"`
	CategoryID   *uuid.UUID `json:"categoryId" validate:"omitempty,uuid"`
	Metadata     *Metadata  `json:"metadata"`
}

// ---------------------------------------------------------------------------
func (c *CreateTodoPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(c)
}

// -----------------------------------------------------------------------------
// uPDATING THE ROW in table using patch method
type UpdateTodoPayload struct {
	ID           uuid.UUID  `param:"id" validate:"required,uuid"`
	Title        *string    `json:"title" validate:"omitempty,min=1,max=255"`
	Description  *string    `json:"description" validate:"omitempty,max=1000"`
	Status       *Status    `json:"status" validate:"omitempty,oneof=draft active completed archived"`
	Priority     *Priority  `json:"priority" validate:"omitempty,oneof=low medium high"`
	DueDate      *time.Time `json:"dueDate" validate:"omitempty"`
	ParentTodoID *uuid.UUID `json:"parentTodoId" validate:"omitempty,uuid"`
	CategoryID   *uuid.UUID `json:"categoryId" validate:"omitempty,uuid"`
	Metadata     *Metadata  `json:"metadata"`
}

func (u *UpdateTodoPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(u)
}

//---------------------------------------------------------------------------------------------
// Get all todos with pagination and filtering

type GetTodoQuery struct {
	Page         *int       `query:"page" validate:"omitempty,min=1"`
	Limit        *int       `query:"limit" validate:"omitempty,min=1,max=1000"`
	Sort         *string    `queryL:"sort" validate:"omitempty,oneof=created_at updated_at title priority due_date"`
	Order        *string    `query:"order" validate:"omitempty,oneof= asc desc"`
	Search       *string    `query:"search" validate:"omitempty,min=1"`
	Status       *Status    `query:"status" validate:"omitempty,oneof=draft active completed archived"`
	Priority     *Priority  `query:"priority" validate:"omitempty,oneof=low medium high"`
	CategoryID   *uuid.UUID `query:"categoryId" validate:"omitempty,uuid"`
	ParentTodoID *uuid.UUID `query:"parentTodoId" validate:"omitempty,uuid"`
	DueFrom      *time.Time `query:"dueFrom"`
	DueTo        *time.Time `query:"dueTo"`
	Overdue      *bool      `query:"overdue"`
	Completed    *bool      `query:"completed"`
}

func (q *GetTodoQuery) Validate() error {
	validate := validator.New()
	if err := validate.Struct(q); err != nil {
		return err
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
		defaultsort := "created_at"
		q.Sort = &defaultsort
	}
	if q.Order == nil {
		defaultorder := "desc"
		q.Order = &defaultorder
	}
	return nil

}

//--------------------------------------------------------------------------------------------------------

type GetTodoByIDPayload struct {
	ID uuid.UUID `param:"id" validate:"required,uuid"`
}

func (g *GetTodoByIDPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(g)
}

// --------------------------------------------------------------------------------------------------------
type DeleteTodoPayload struct {
	Id uuid.UUID `param:"id" validate:"required,uuid"`
}

func (d *DeleteTodoPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(d)
}

type GetTodoStatsPayload struct{}

func (p *GetTodoStatsPayload) Validate() error {
	return nil
}

// ---------------------------------------Todo Attachments payload--------------------------------------------------
type UploadTodoAttachmentPayload struct {
	TodoID uuid.UUID `param:"id" validate:"required,uuid"`
}

func (u *UploadTodoAttachmentPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(u)
}

//-----------------------------------------------------------------------------------------------------------

type DeleteTodoAttachmentPayload struct {
	TodoID       uuid.UUID `param:"id" validate:"required,uuid"`
	AttachmentID uuid.UUID `param:"attachmentId" validate:"required,uuid"`
}

func (u *DeleteTodoAttachmentPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(u)
}

//-------------------------------------------------------------------------------------------------------------

type GetAttachmentPresignedURLPayload struct {
	TodoId       uuid.UUID `param:"id" validate:"required,uuid"`
	AttachmentID uuid.UUID `param:"attachmentId" validate:"required,uuid"`
}

func (u *GetAttachmentPresignedURLPayload) Validate() error {
	validate := validator.New()
	return validate.Struct(u)
}
