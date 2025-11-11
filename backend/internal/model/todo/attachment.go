package todo

import "github.com/satya-18-w/go-TODO_TASKER/internal/model"

type Todo_Attachment struct {
	model.Base
	TodoID string `json:"todoID" db:"todo_id"`
	Name string `json:"name" db:"name"`
	UploadedBy string `json:"uploadedBY" db:"uploaded_by"`
	DownloadBy string `json:"downloadBy" db:"download_by"`
	FileSize *int64 `json:"fileSize" db:"file_size"`
	MimeType *string `json:"mimeType" db:"mime_type"`

} 