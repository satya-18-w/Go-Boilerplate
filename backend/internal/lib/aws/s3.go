package aws

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/satya-18-w/go-TODO_TASKER/internal/server"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Client struct {
	server *server.Server
	Client *s3.Client
}

func NewS3Client(s *server.Server, cfg aws.Config) *S3Client {
	awsConfig := s.Config.AWS

	// Configure S3 client with options for R2/Sevalla compatibility
	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		// Enable path-style access for R2/Sevalla
		if awsConfig.EndpointURL != "" {
			o.UsePathStyle = true
		}
	})

	return &S3Client{
		server: s,
		Client: client,
	}
}

func (s *S3Client) UploadFile(ctx context.Context, bucket string, fileName string, file io.Reader) (string, error) {
	fileKey := fmt.Sprintf("%s_%d", fileName, time.Now().Unix())

	var buffer bytes.Buffer

	_, err := io.Copy(&buffer, file)
	if err != nil {
		return "", fmt.Errorf("Failed to read file Content: %w", err)
	}

	_, err = s.Client.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(bucket),
		Key:         aws.String(fileKey),
		Body:        bytes.NewReader(buffer.Bytes()),
		ContentType: aws.String(http.DetectContentType(buffer.Bytes())),
	})

	if err != nil {
		return "", fmt.Errorf("Failed to upload file to s3 with bucket Name: %s: error: %w", bucket, err)

	}

	return fileKey, nil

}

func (s *S3Client) CreatePresinedUrl(ctx context.Context, bucket string, fileKey string) (string, error) {
	presignClient := s3.NewPresignClient(s.Client)

	expiration := time.Minute * 60
	presignedUrl, err := presignClient.PresignGetObject(
		ctx, &s3.GetObjectInput{
			Bucket: aws.String(bucket),
			Key:    aws.String(fileKey),
		},
		s3.WithPresignExpires(expiration),
	)
	if err != nil {
		return "", err
	}

	return presignedUrl.URL, nil

}

func (s *S3Client) DeleteObject(ctx context.Context, bucket string, key string) error {
	_, err := s.Client.DeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
	})
	if err != nil {
		return fmt.Errorf("Failed to Delete object %s : %w", key, err)
	}
	return nil
}
