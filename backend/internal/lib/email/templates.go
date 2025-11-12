package email

type Template string

const (
	TemplateWelcome Template = "welcome"
	TemplateDueDateReminder Template = "due-date-reminder"
	TemplateOverDueNotification Template = "overdue-notification"
	TemplateWeeklyReport Template = "weekly-report"
)
