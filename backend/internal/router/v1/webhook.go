package v1

import (
	"github.com/labstack/echo/v4"
	"github.com/satya-18-w/go-TODO_TASKER/internal/webhook"
)

func registerWebhookRouter(r *echo.Group, h *webhook.WebhookHandler) {
	router := r.Group("/webhooks")
	// Clerk webhooks need to be verified but not by our standard user auth, so no Auth middleware here.
	// We might add signature verification middleware specifically for this later if needed.
	router.POST("/clerk", h.HandleClerkWebhook)
}
