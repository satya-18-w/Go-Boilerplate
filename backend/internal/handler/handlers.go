package handler

import (
	"github.com/satya-18-w/go-TODO_TASKER/internal/server"
	"github.com/satya-18-w/go-TODO_TASKER/internal/service"
)

type Handlers struct {
	Health  *HealthHandler
	OpenAPI *OpenAPIHandler
}

func NewHandlers(s *server.Server,services *service.Services) *Handlers{
	return &Handlers{
		Health: NewHealthHandler(s) ,
		OpenAPI: NewOpenAPIHandler(s),
	}
}

