import { todoApi, type Todo } from "@/api/todos";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

export function TodoList() {
    const { getToken } = useAuth();

    const { data, isLoading, error } = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const token = await getToken();
            if (!token) throw new Error("Unauthorized");
            return todoApi.getAll(token);
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-destructive text-center p-4">
                Error loading todos: {error.message}
            </div>
        );
    }

    const todos = data?.data || []; // Assuming paginated response has data property, checked backend handler Handle helper usually wraps in standard response. GetTodos returns PaginatedResponse.

    if (todos.length === 0) {
        return (
            <div className="text-center p-8 text-muted-foreground">
                No todos found. Create one to get started!
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {todos.map((todo: Todo) => (
                <Card key={todo.id}>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-lg font-semibold truncate">
                                {todo.title}
                            </CardTitle>
                            <Badge variant={getPriorityVariant(todo.priority)}>
                                {todo.priority}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {todo.description && (
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                {todo.description}
                            </p>
                        )}
                        <div className="text-xs text-muted-foreground">
                            Created: {format(new Date(todo.createdAt), "PPP")}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function getPriorityVariant(priority: string) {
    switch (priority) {
        case "high":
            return "destructive";
        case "medium":
            return "default"; // or secondary
        case "low":
            return "secondary"; // or outline
        default:
            return "outline";
    }
}
