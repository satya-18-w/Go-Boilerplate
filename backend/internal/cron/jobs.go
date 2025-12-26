package cron

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/satya-18-w/go-TODO_TASKER/internal/lib/job"
	"github.com/satya-18-w/go-TODO_TASKER/internal/model/todo"
)

type DueDateReminderJob struct{}

func (j *DueDateReminderJob) Name() string {
	return "due-date-reminders"
}
func (j *DueDateReminderJob) Description() string {
	return "Enqueue email reminders for todos due soon"
}

func (j *DueDateReminderJob) Run(ctx context.Context, jobCtx *JobContext) error {
	todos, err := jobCtx.Repositories.Todo.GetTodosDueInHours(
		ctx,
		jobCtx.Config.Cron.ReminderHours,
		jobCtx.Config.Cron.BatchSize,
	)

	if err != nil {
		return err
	}
	jobCtx.Server.Logger.Info().
		Int("todo_count", len(todos)).
		Int("hours", jobCtx.Config.Cron.ReminderHours).
		Msg("Found todos due soon")

	userTodos := make(map[string][]string)
	enqueuedCount := 0

	for _, todo := range todos {
		if len(userTodos[todo.UserID]) < jobCtx.Config.CRON.MaxTodosPerUserNotification {
			userTodos[todo.UserID] = append(userTodos[todo.UserID], todo.Title)
		}

		reminderTask := &job.ReminderEmailTask{
			UserID:    todo.UserID,
			TodoID:    todo.ID,
			TodoTitle: todo.Title,
			DueDate:   *todo.DueDate,
			TaskType:  "due_date_reminder",
		}

		err := job.EnqueueReminderEmail(jobCtx.JobClient, reminderTask)
		if err != nil {
			jobCtx.Server.Logger.Error().
				Err(err).
				Str("todo_id", todo.ID.String()).
				Str("user_id", todo.UserID).
				Msg("Failed to enqueue reminder email")
			continue
		}

		enqueuedCount++
		jobCtx.Server.Logger.Info().
			Str("todo_id", todo.ID.String()).
			Str("user_id", todo.UserID).
			Str("todo_title", todo.Title).
			Msg("Enqueued reminder for todo")

	}

	jobCtx.Server.Logger.Info().
		Int("enquedCount", enqueuedCount).
		Int("Total_todos", len(userTodos)).
		Msg("Due date reminder emails enqueued")

	for userID, titles := range userTodos {
		jobCtx.Server.Logger.Info().
			Str("user_id", userID).
			Int("reminder_count", len(titles)).
			Msg("User reminders enqueued")
	}

	return nil

}

// ----------------------------------------OverDue Notification Job-----------------------------------
type OverDueNotificationsJob struct {
}

func (j *OverDueNotificationsJob) Name() string {
	return "overdue-notifications"
}

func (j *OverDueNotificationsJob) Description() string {
	return "Enqueue notifications for overdue todos"
}

func (j *OverDueNotificationsJob) Run(ctx context.Context, jobCtx *JobContext) error {
	todos, err := jobCtx.Repositories.Todo.GetOverdueTodos(ctx, jobCtx.Config.CRON.BatchSize)
	if err != nil {
		return err
	}

	jobCtx.Server.Logger.Info().
		Int("todo_count", len(todos)).
		Msg("Found overdue todos")

	userTodos := make(map[string][]string)
	enqueuedCount := 0
	for _, todo := range todos {
		if len(userTodos[todo.UserID]) < jobCtx.Config.CRON.MaxTodosPerUserNotification {
			userTodos[todo.UserID] = append(userTodos[todo.UserID], todo.Title)

		}

		overDueTask := &job.ReminderEmailTask{
			UserID:    todo.UserID,
			TodoID:    todo.ID,
			TodoTitle: todo.Title,
			DueDate:   *todo.DueDate,
			TaskType:  "overdue-notification",
		}
		err := job.EnqueueReminderEmail(jobCtx.JobClient, overDueTask)
		if err != nil {
			jobCtx.Server.Logger.Error().
				Err(err).
				Str("todo_id", todo.ID.String()).
				Str("user_id", todo.UserID).
				Msg("Failed to enqueue overdue notification")
			continue
		}

		enqueuedCount++
		jobCtx.Server.Logger.Info().
			Str("todo_id", todo.ID.String()).
			Str("todo_title", todo.Title).
			Str("User_id", todo.UserID).
			Msg("Enqueued OverDue Notification")

	}

	jobCtx.Server.Logger.Info().
		Int("Enqueue_COunt", enqueuedCount).
		Int("todos_total", len(todos)).
		Msg("OverDue notifications enqueued")

	for userId, title := range userTodos {
		jobCtx.Server.Logger.Info().
			Str("User_id", userId).
			Int("Overdue_todo_Count", len(title)).
			Msg("User OverDue todos enqueued")
	}
	return nil
}

// -------------------------------------Weekly Report Job-----------------------------------

type WeeklyReportsJob struct{}

func (j *WeeklyReportsJob) Name() string {
	return "weekly-reports"
}

func (j *WeeklyReportsJob) Description() string {
	return "Enqueue weekly productivity reports"
}

func (j *WeeklyReportsJob) Run(ctx context.Context, jobCtx *JobContext) error {
	now := time.Now()
	weekAgo := now.AddDate(0, 0, -7)

	stats, err := jobCtx.Repositories.Todo.GetWeeklyStatsForUsers(ctx, weekAgo, now)
	if err != nil {
		return err
	}

	jobCtx.Server.Logger.Info().
		Int("user_count", len(stats)).
		Msg("Generating weekly reports")

	enqueuedCount := 0
	for _, userStats := range stats {
		completedTodos, err := jobCtx.Repositories.Todo.GetCompletedTodosForUser(ctx, userStats.UserID, weekAgo, now)
		if err != nil {
			jobCtx.Server.Logger.Error().
				Err(err).
				Str("user_id", userStats.UserID).
				Msg("Failed to fetch completed todos")
			completedTodos = []todo.PopulatedTodo{}
		}

		overdueTodos, err := jobCtx.Repositories.Todo.GetOverdueTodosForUser(ctx, userStats.UserID)
		if err != nil {
			jobCtx.Server.Logger.Error().
				Err(err).
				Str("user_id", userStats.UserID).
				Msg("Failed to fetch overdue todos")
			overdueTodos = []todo.PopulatedTodo{}
		}

		weeklyReportTask := &job.WeeklyReportEmailTask{
			UserID:         userStats.UserID,
			WeekStart:      weekAgo,
			WeekEnd:        now,
			CompletedCount: userStats.CompletedCount,
			ActiveCount:    userStats.ActiveCount,
			OverDueCount:   userStats.OverdueCount,
			CompletedTodos: completedTodos,
			OverDueTodos:   overdueTodos,
		}

		err = job.EnqueueWeeklyReportEmail(jobCtx.JobClient, weeklyReportTask)
		if err != nil {
			jobCtx.Server.Logger.Error().
				Err(err).
				Str("user_id", userStats.UserID).
				Msg("Failed to enqueue weekly report")
			continue
		}

		enqueuedCount++
		jobCtx.Server.Logger.Info().
			Str("user_id", userStats.UserID).
			Int("created", userStats.CreatedCount).
			Int("completed", userStats.CompletedCount).
			Int("active", userStats.ActiveCount).
			Int("overdue", userStats.OverdueCount).
			Msg("Enqueued weekly report")
	}

	jobCtx.Server.Logger.Info().
		Int("enqueued_count", enqueuedCount).
		Int("total_users", len(stats)).
		Msg("Weekly reports enqueued")
	return nil
}

// ----------------------------------------------------------CRON Job For Archiving the comeplted todos----------------------
type AutoArchiveJob struct{}

func (j *AutoArchiveJob) Name() string {
	return "auto-archive"
}

func (j *AutoArchiveJob) Description() string {
	return "Archive old completed todos"
}
func (j *AutoArchiveJob) Run(ctx context.Context, jobCtx *JobContext) error {
	cutoffDate := time.Now().AddDate(0, 0, -jobCtx.Config.CRON.ArchiveDaysThreshold)

	jobCtx.Server.Logger.Info().
		Time("cutoff_date", cutoffDate).
		Msg("Searching for completed todos to archive")

	todos, err := jobCtx.Repositories.Todo.GetCompletedTodoOlderThan(ctx, cutoffDate, jobCtx.Config.CRON.BatchSize)
	if err != nil {
		return err
	}

	jobCtx.Server.Logger.Info().
		Int("todo_count", len(todos)).
		Msg("Found completed todos to archive")

	if len(todos) == 0 {
		jobCtx.Server.Logger.Info().Msg("No todos to archive")
		return nil
	}

	todoIDs := make([]uuid.UUID, len(todos))
	userTodos := make(map[string]int)

	for i, todo := range todos {
		todoIDs[i] = todo.ID
		userTodos[todo.UserID]++
	}

	err = jobCtx.Repositories.Todo.ArchivedTodos(ctx, todoIDs)
	if err != nil {
		return err
	}

	jobCtx.Server.Logger.Info().
		Int("archived_count", len(todoIDs)).
		Msg("Successfully archived todos")

	for userID, count := range userTodos {
		jobCtx.Server.Logger.Info().
			Str("user_id", userID).
			Int("archived_count", count).
			Msg("User todos archived")
	}

	return nil

}
