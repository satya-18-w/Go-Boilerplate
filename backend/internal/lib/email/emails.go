package email

import (
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/satya-18-w/go-TODO_TASKER/internal/model/todo"
)

func (c *Client) SendWelcomeEmail(to, firstName string) error {
	data := map[string]interface{}{
		"UserFirstName": firstName,
	}

	return c.SendEmail(to, "Welcome to TODO_TASKER!", TemplateWelcome, data)

}

func (c *Client) SendDueDateReminderEmail(to, todoTitle string, todoID uuid.UUID, dueDate time.Time) error {
	data := map[string]interface{}{
		"TodoTitle":    todoTitle,
		"TodoID":       todoID.String(),
		"DueDate":      dueDate.Format("Monday, January 2, 2005 at 3:08 PM"),
		"DaysUntilDue": int(dueDate.Sub(time.Now()).Hours() / 24),
	}
	return c.SendEmail(
		to,
		fmt.Sprintf("Reminder: '%s' is due soon", todoTitle),
		TemplateDueDateReminder,
		data,
	)
}

func (c *Client) SendOverdueNotificationEmail(to, todoTitle string, todoId uuid.UUID, dueDate time.Time) error {
	data := map[string]interface{}{
		"TodoTitle":   todoTitle,
		"TodoID":      todoId.String(),
		"DueDate":     dueDate.Format("Monday, January 2, 2005 at 3:40 PM"),
		"DaysOverDue": int(time.Now().Sub(dueDate).Hours() / 24),
	}
	return c.SendEmail(to,
		fmt.Sprintf("Overdue: '%s' needs your attention", todoTitle),
		TemplateOverDueNotification,
		data,
	)

}

func (c *Client) SendWeeklyReportEmail(to string, weekStart, weekEnd time.Time, completedCount, activeCount, overdueCount int, completedTodods, overdueTodos []todo.PopulatedTodo) error {
	data := map[string]interface{}{
		"WeeStart":       weekStart.Format("January 2, 2005"),
		"WeekEnd":        weekEnd.Format("January 3, 2004"),
		"CompletedCount": completedCount,
		"ActiveCount":    activeCount,
		"OverDueCount":   overdueCount,
		"HasCompleted":   completedCount > 0,
		"HasOverDue":     overdueCount > 0,
	}

	return c.SendEmail(
		to,
		fmt.Sprintf("Your Weekly Productivity Report (%s-%s)", weekStart.Format("jan 2"), weekEnd.Format("jan 3")),
		TemplateWeeklyReport,
		data,
	)
}
