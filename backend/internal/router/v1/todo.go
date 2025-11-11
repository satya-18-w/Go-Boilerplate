package v1

import (
	"github.com/labstack/echo/v4"
	"github.com/satya-18-w/go-TODO_TASKER/internal/handler"
	"github.com/satya-18-w/go-TODO_TASKER/internal/middleware"
)

func registerTodoRouter(r *echo.Group, h *handler.TodoHandler, ch *handler.CommentHandler, auth *middleware.AuthMiddleware) {
	// Todo Operations
	todos := r.Group("/todos")
	todos.Use(auth.RequireAuth)
	// All the request need to be authenticated

	// Collection Operations
	todos.POST("", h.CreateTodo)
	todos.GET("", h.GetTodos)
	todos.GET("/stats", h.GetTodoStats)


	// Indivisual Todo Operations
	dynamicTodo:=todos.Group("/:id")
	dynamicTodo.GET("",h.GetTodoByID)
	dynamicTodo.PATCH("",h.UpdateTodo)
	dynamicTodo.DELETE("",h.DeleteTodo)


	// Todo comments
	todoComments:=dynamicTodo.Group("/comments")
	todoComments.POST("",ch.AddComment)
	todoComments.GET("",ch.GetCommentsByTodoID)


	//Here You need to write the todo Attachments routers
	
}
