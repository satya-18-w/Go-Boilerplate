import { fetchClient } from "./client";

export type Priority = "low" | "medium" | "high";
export type Status = "draft" | "active" | "completed" | "archived";

export interface CreateTodoPayload {
    title: string;
    description?: string;
    priority?: Priority;
    dueDate?: string; // ISO date string
    categoryId?: string;
}

export interface Todo {
    id: string;
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetTodosQuery {
    page?: number;
    limit?: number;
    status?: Status;
    search?: string;
}

export const todoApi = {
    create: (token: string, payload: CreateTodoPayload) => {
        return fetchClient("/api/v1/todos", {
            method: "POST",
            body: JSON.stringify(payload),
            token,
        });
    },

    getAll: (token: string, query?: GetTodosQuery) => {
        const queryString = new URLSearchParams();
        if (query) {
            if (query.page) queryString.append("page", query.page.toString());
            if (query.limit) queryString.append("limit", query.limit.toString());
            if (query.status) queryString.append("status", query.status);
            if (query.search) queryString.append("search", query.search);
        }
        return fetchClient(`/api/v1/todos?${queryString.toString()}`, {
            method: "GET",
            token,
        });
    },
};
