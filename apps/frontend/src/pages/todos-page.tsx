import { useState } from "react";
import { useDebounce } from "@/api/hooks/use-debounce";
import { useGetAllCategories } from "@/api/hooks/use-category-query";
import { useGetAllTodos, type TGetTodosQuery } from "@/api/hooks/use-todo-query";
import { TodoCard } from "@/components/todos/todo-card";
import { TodoCreateForm } from "@/components/todos/todo-create-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type TodoStatus = "draft" | "active" | "completed" | "archived";
type TodoPriority = "low" | "medium" | "high" | "all";

export function TodosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<TodoStatus | "all">("all");
  const [selectedPriority, setSelectedPriority] = useState<TodoPriority>("all");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [showOverdue, setShowOverdue] = useState(false);
  const [showCompleted, setShowCompleted] = useState<boolean | undefined>();
  const [sortBy, setSortBy] = useState<"created_at" | "due_date" | "priority" | "title">("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const debouncedSearch = useDebounce(searchQuery, 300);

  const query: TGetTodosQuery = {
    page,
    limit: 20,
    search: debouncedSearch || undefined,
    status: selectedStatus !== "all" ? selectedStatus : undefined,
    priority: selectedPriority !== "all" ? selectedPriority : undefined,
    categoryId: selectedCategory,
    overdue: showOverdue || undefined,
    completed: showCompleted,
    sort: sortBy,
    order: sortOrder,
  };

  const { data: todos, isLoading } = useGetAllTodos({ query });
  const { data: categories } = useGetAllCategories({
    query: { page: 1, limit: 100 },
  });

  const handleTabChange = (value: string) => {
    setSelectedStatus(value as TodoStatus | "all");
    setPage(1);
  };

  const handleFilterChange = () => {
    setPage(1);
  };

  const tabCounts = {
    all: todos?.total || 0,
    draft: 0,
    active: 0,
    completed: 0,
    archived: 0,
  };

  const tabs = [
    { value: "all", label: "All" },
    { value: "draft", label: "Draft" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
    { value: "archived", label: "Archived" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and organize your tasks
          </p>
        </div>
        <TodoCreateForm>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </TodoCreateForm>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleFilterChange();
                }}
              />
            </div>

            {/* Priority Filter */}
            <Select
              value={selectedPriority}
              onValueChange={(value) => {
                setSelectedPriority(value as TodoPriority);
                handleFilterChange();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select
              value={selectedCategory || "all"}
              onValueChange={(value) => {
                setSelectedCategory(value === "all" ? undefined : value);
                handleFilterChange();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.data?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value as "created_at" | "due_date" | "priority" | "title");
                handleFilterChange();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Created Date</SelectItem>
                <SelectItem value="due_date">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="overdue"
                checked={showOverdue}
                onCheckedChange={(checked) => {
                  setShowOverdue(checked as boolean);
                  handleFilterChange();
                }}
              />
              <label
                htmlFor="overdue"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show Overdue Only
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs and Content */}
      <div className="space-y-6">
        <div className="flex space-x-2 bg-muted p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={selectedStatus === tab.value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => handleTabChange(tab.value)}
              className={cn(selectedStatus === tab.value && "bg-background text-foreground shadow-sm")}
            >
              {tab.label}
              {tab.value === "all" && <span className="ml-2 text-xs">({tabCounts.all})</span>}
            </Button>
          ))}
        </div>

        <div className="mt-6">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : todos?.data && todos.data.length > 0 ? (
            <>
              <div className="space-y-4">
                {todos.data.map((todo) => (
                  <TodoCard key={todo.id} todo={todo} />
                ))}
              </div>

              {/* Pagination */}
              {todos.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {(page - 1) * 20 + 1} to{" "}
                    {Math.min(page * 20, todos.total)} of {todos.total} tasks
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= todos.totalPages}
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || selectedCategory || selectedPriority !== "all"
                    ? "Try adjusting your filters or search terms."
                    : "Create your first task to get started!"}
                </p>
                {!searchQuery && (
                  <TodoCreateForm>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Task
                    </Button>
                  </TodoCreateForm>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
