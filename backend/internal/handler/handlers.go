package handler

import (
	"github.com/satya-18-w/go-TODO_TASKER/internal/server"
	"github.com/satya-18-w/go-TODO_TASKER/internal/service"
	"github.com/satya-18-w/go-TODO_TASKER/internal/webhook"
)

type Handlers struct {
	Health   *HealthHandler
	OpenAPI  *OpenAPIHandler
	Todo     *TodoHandler
	Comment  *CommentHandler
	Category *CategoryHandler
	Webhook  *webhook.WebhookHandler
}

func NewHandlers(s *server.Server, services *service.Services) *Handlers {
	return &Handlers{
		Health:   NewHealthHandler(s),
		OpenAPI:  NewOpenAPIHandler(s),
		Todo:     NewTodoHandler(s, services.Todo),
		Comment:  NewCommentHandler(s, services.Comment),
		Category: NewCategoryHandler(s, services.Category),
		Webhook:  webhook.NewWebhookHandler(s, services.Job),
	}
}
