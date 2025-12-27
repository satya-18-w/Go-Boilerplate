package main

import (
	"fmt"
	"os"

	"github.com/rs/zerolog/log"
	"github.com/satya-18-w/go-TODO_TASKER/internal/config"
	"github.com/satya-18-w/go-TODO_TASKER/internal/lib/email"
)

func main() {
	// Chdir removed as we run from backend root
	// if err := os.Chdir("../../"); err != nil {
	// 	log.Fatal().Err(err).Msg("failed to change directory")
	// }

	cwd, _ := os.Getwd()
	fmt.Printf("Current Working Directory: %s\n", cwd)

	if _, err := os.Stat("templates/emails/welcome.html"); os.IsNotExist(err) {
		fmt.Println("Error: templates/emails/welcome.html does not exist!")
	} else {
		fmt.Println("Template file found.")
	}

	// Load config
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatal().Err(err).Msg("failed to load config")
	}

	logger := log.With().Str("service", "email-debug").Logger()
	client := email.NewClient(cfg, &logger)

	// Send to sender email itself to verify credentials work
	targetEmail := cfg.Integration.SenderEmail
	if targetEmail == "" {
		// Fallback if somehow empty but passed validation (unlikely)
		targetEmail = "test@example.com"
	}

	fmt.Printf("Attempting to send email to %s using Resend...\n", targetEmail)

	// Ensure template directory is found.
	// Since we Chdir to backend root, "templates/emails/" path in SendEmail should work relative to CWD.

	err = client.SendWelcomeEmail(targetEmail, "DebugUser")
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to send welcome email")
	}
	fmt.Println("Successfully sent welcome email via Resend!")
}
