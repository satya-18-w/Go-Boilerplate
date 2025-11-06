package repository

import "github.com/satya-18-w/go-TODO_TASKER/internal/server"

type Repositories struct{
	Todo *TodoRepository
	Comment *CommentRepository
	Category *CategoryRepository
}

func NewRepositories(s *server.Server) *Repositories {
	return &Repositories{
		Todo: NewTodoRepository(s),
		Comment: NewCommentRepository(s),
		Category:  NewCategoryRepository(s),
	}
}






