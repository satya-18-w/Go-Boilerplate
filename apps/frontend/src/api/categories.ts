import { fetchClient } from "./client";

export interface Category {
    id: string;
    name: string;
    color: string;
    description?: string;
}

export interface GetCategoriesQuery {
    page?: number;
    limit?: number;
    search?: string;
}

export const categoryApi = {
    getAll: (token: string, query?: GetCategoriesQuery) => {
        const queryString = new URLSearchParams();
        if (query) {
            if (query.page) queryString.append("page", query.page.toString());
            if (query.limit) queryString.append("limit", query.limit.toString());
            if (query.search) queryString.append("search", query.search);
        }
        return fetchClient(`/api/v1/categories?${queryString.toString()}`, {
            method: "GET",
            token,
        });
    },
};
