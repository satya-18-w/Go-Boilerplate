package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/satya-18-w/go-boilerplate/internal/server"
)

// Handler Provides base functionality for all Handlers

type Handler struct {
	server *server.Server
}

// newhandler creates a new base handler
func NewHandler(s *server.Server) Handler {

	return Handler{
		server: s,
	}
}

// Handlerfunc represent a typed handler function that processes a request and returns a response
type HandlerFunc[Req validation.Validatable, Res any] func(c echo.Context,req Req)
