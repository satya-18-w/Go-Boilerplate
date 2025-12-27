package email

import (
	"bytes"
	"fmt"
	"html/template"
	"path/filepath"

	"github.com/pkg/errors"
	"github.com/resend/resend-go/v2"
	"github.com/rs/zerolog"
	"github.com/satya-18-w/go-TODO_TASKER/internal/config"
)

type Client struct {
	client      *resend.Client
	logger      *zerolog.Logger
	senderEmail string
}

func NewClient(cfg *config.Config, logger *zerolog.Logger) *Client {
	return &Client{
		client:      resend.NewClient(cfg.Integration.ResendAPIKey),
		logger:      logger,
		senderEmail: cfg.Integration.SenderEmail,
	}

}

func (c *Client) SendEmail(to, subject string, templateName Template, data map[string]any) error {
	templPath := filepath.Join("templates", "emails", string(templateName)+".html")
	// Ensure slash consistency on windows if needed or just rely on Join
	// templPath is relative to CWD.

	templ, err := template.ParseFiles(templPath)
	if err != nil {
		return errors.Wrapf(err, "Failed to parse email template %s", templateName)
	}

	var body bytes.Buffer
	if err := templ.Execute(&body, data); err != nil {
		return errors.Wrapf(err, "failed to execute email template %s", templateName)
	}

	params := &resend.SendEmailRequest{
		From:    fmt.Sprintf("%s <%s>", "TODO_TASKER", c.senderEmail),
		To:      []string{to},
		Subject: subject,
		Html:    body.String(),
	}

	_, err = c.client.Emails.Send(params)

	if err != nil {
		return fmt.Errorf("failed to send email: %w", err)

	}
	return nil

}
