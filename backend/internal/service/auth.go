package service

import (
	"context"
	"fmt"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/satya-18-w/go-TODO_TASKER/internal/server"
)

type AuthService struct {
	server *server.Server
}

func NewAuthService(s *server.Server) *AuthService {
	clerk.SetKey(s.Config.Auth.SecretKey)
	return &AuthService{
		server: s,
	}
}

func (a *AuthService) GetUserEmail(ctx context.Context, userID string) (string, error) {
	u, err := user.Get(ctx, userID)
	if err != nil {
		return "", fmt.Errorf("failed to get user: %w", err)
	}

	if len(u.EmailAddresses) == 0 {
		return "", fmt.Errorf("user has no email addresses")
	}

	// Return the primary email address
	if u.PrimaryEmailAddressID != nil {
		for _, email := range u.EmailAddresses {
			if email.ID == *u.PrimaryEmailAddressID {
				return email.EmailAddress, nil
			}
		}
	}

	// Fallback to first email if primary not found
	return u.EmailAddresses[0].EmailAddress, nil
}
