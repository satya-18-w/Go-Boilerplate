package middleware

import (
	"context"

	"github.com/labstack/echo/v4"
	"github.com/newrelic/go-agent/v3/newrelic"
	"github.com/rs/zerolog"
	"github.com/satya-18-w/go-boilerplate/internal/logger"
	"github.com/satya-18-w/go-boilerplate/internal/server"
	// "golang.org/x/tools/go/analysis/passes/nilfunc"
)

const (
	UserIDKey   = "user_id"
	UserRoleKey = "user_role"
	LoggerKey   = "logger"
)

type ContextEnhancer struct {
	server *server.Server
}

func NewContextEnhancer(server *server.Server) *ContextEnhancer {
	return &ContextEnhancer{
		server: server,
	}
}

func (ce *ContextEnhancer) EnhanceContext() echo.MiddlewareFunc {

	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {

			//Extract the request ID
			requestID := GetRequestID(c)

			//create enhanced logger with request context
			contextLogger := ce.server.Logger.With().
				Str("request_id", requestID).
				Str("method", c.Request().Method).
				Str("path", c.Path()).
				Str("ip", c.RealIP()).
				Logger()

			//Add trace context if available
			if txn := newrelic.FromContext(c.Request().Context()); txn != nil {
				contextLogger = logger.WithTraceContext(contextLogger, txn)
			}

			// exract user information from jwt token or session
			if userId := ce.extractUserID(c); userId != "" {
				contextLogger = contextLogger.With().Str("user_id", userId).Logger()
			}

			if userRole := ce.extractUserRole(c); userRole != "" {
				contextLogger = contextLogger.With().Str("user_role", userRole).Logger()
			}

			// STore the enhanced logger in context
			c.Set(LoggerKey, &contextLogger)

			// Create a new context with the logger
			ctx := context.WithValue(c.Request().Context(), LoggerKey, &contextLogger)
			c.SetRequest(c.Request().WithContext(ctx))

			return next(c)

		}

	}

}

func (ce *ContextEnhancer) extractUserID(c echo.Context) string {
	// Check if user_id was already set by auth middleware (Clerk)
	if userID, ok := c.Get("user_id").(string); ok && userID != "" {
		return userID
	}
	return ""
}

func (ce *ContextEnhancer) extractUserRole(c echo.Context) string {
	// Check if user_role was set by auth middleware (Clerk)
	if userRole, ok := c.Get("user_role").(string); ok && userRole != "" {
		return userRole
	}
	return ""
}

func GetUserID(c echo.Context) string {
	if userID, ok := c.Get(UserIDKey).(string); ok {
		return userID
	}
	return ""
}

func GetLogger(c echo.Context) *zerolog.Logger {
	if logger, ok := c.Get(LoggerKey).(*zerolog.Logger); ok {
		return logger
	}
	// Fallback to a basic logger if not found
	logger := zerolog.Nop()
	return &logger
}
