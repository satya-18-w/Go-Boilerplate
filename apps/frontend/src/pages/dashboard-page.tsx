import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTodoStats, useGetAllTodos } from "@/api/hooks/use-todo-query";
import { useGetAllCategories } from "@/api/hooks/use-category-query";
import { TodoCard } from "@/components/todos/todo-card";
import { TodoCreateForm } from "@/components/todos/todo-create-form";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Archive,
  Plus,
  ChevronRight,
} from "lucide-react";

export function DashboardPage() {
  const { data: stats } = useGetTodoStats();
  const { data: recentTodos, isLoading: todosLoading } = useGetAllTodos({
    query: { page: 1, limit: 5, sort: "created_at", order: "desc" },
  });
  const { data: categories, isLoading: categoriesLoading } = useGetAllCategories({
    query: { page: 1, limit: 20 },
  });

  const statCards = [
    {
      title: "Active Tasks",
      value: stats?.active || 0,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Draft",
      value: stats?.draft || 0,
      icon: CheckCircle,
      color: "text-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-950",
    },
    {
      title: "Overdue",
      value: stats?.overdue || 0,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
    },
    {
      title: "Completed",
      value: stats?.completed || 0,
      icon: Archive,
      color: "text-gray-600",
      bgColor: "bg-gray-50 dark:bg-gray-950",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your tasks and productivity
          </p>
        </div>
        <TodoCreateForm>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </TodoCreateForm>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Tasks and Categories */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Tasks</CardTitle>
            <Link to="/todos">
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {todosLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : recentTodos?.data?.length ? (
              <div className="space-y-4">
                {recentTodos.data.slice(0, 3).map((todo) => (
                  <TodoCard key={todo.id} todo={todo} compact />
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <p className="text-sm">No tasks yet</p>
                <TodoCreateForm>
                  <Button variant="outline" size="sm" className="mt-2">
                    Create Task
                  </Button>
                </TodoCreateForm>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Categories Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Categories</CardTitle>
            <Link to="/categories">
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {categoriesLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : categories?.data?.length ? (
              <div className="space-y-2">
                {categories.data.slice(0, 6).map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm font-medium">
                        {category.name}
                      </span>
                    </div>
                  </div>
                ))}
                {categories.data.length > 6 && (
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    +{categories.data.length - 6} more categories
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <p className="text-sm">No categories yet</p>
                <Link to="/categories">
                  <Button variant="outline" size="sm" className="mt-2">
                    Create Category
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
