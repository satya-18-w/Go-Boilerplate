package category

import "github.com/satya-18-w/go-TODO_TASKER/internal/model"

type Category struct {
	model.Base
	UserID string  `json:"userId" db:"user_id"`
	Name   string  `json:"name" db:"name"`
	Color  *string `json:"color" db:"color"`
	// We are using pointer here because Description can be null
	Description *string `json:"description" db:"description"`
}
