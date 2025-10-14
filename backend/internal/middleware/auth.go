package middleware

import (
	"github.com/labstack/echo/v4"
	"github.com/satya-18-w/go-boilerplate/internal/server"
)

type AuthMiddleware struct {
	server *server.Server
}
func NewAuthMiddleware(s *server.Server) *AuthMiddleware{
	return &AuthMiddleware{
		server: s,

		}
}



func (auth *AuthMiddleware) RequireAuth(next echo.HandlerFunc) echo