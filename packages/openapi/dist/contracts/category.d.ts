import z from "zod";
export declare const categoryContract: {
    getCategories: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        query: z.ZodObject<{
            page: z.ZodOptional<z.ZodNumber>;
            limit: z.ZodOptional<z.ZodNumber>;
            sort: z.ZodOptional<z.ZodEnum<["created_at", "updated_at", "name"]>>;
            order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
            search: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            sort?: "created_at" | "updated_at" | "name" | undefined;
            search?: string | undefined;
            page?: number | undefined;
            limit?: number | undefined;
            order?: "asc" | "desc" | undefined;
        }, {
            sort?: "created_at" | "updated_at" | "name" | undefined;
            search?: string | undefined;
            page?: number | undefined;
            limit?: number | undefined;
            order?: "asc" | "desc" | undefined;
        }>;
        summary: "Get all categories";
        description: "Get all categories";
        method: "GET";
        path: "/v1/categories";
        responses: {
            200: z.ZodType<import("@TODO_TASKER/zod").PaginatedResponse<{
                id: string;
                userId: string;
                name: string;
                color: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
            }>, z.ZodTypeDef, import("@TODO_TASKER/zod").PaginatedResponse<{
                id: string;
                userId: string;
                name: string;
                color: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
            }>>;
        };
    };
    createCategory: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        summary: "Create a new category";
        description: "Create a new category";
        method: "POST";
        body: z.ZodObject<{
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            name: z.ZodString;
            color: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            color: string;
            description?: string | null | undefined;
        }, {
            name: string;
            color: string;
            description?: string | null | undefined;
        }>;
        path: "/v1/categories";
        responses: {
            201: z.ZodObject<{
                id: z.ZodString;
                userId: z.ZodString;
                name: z.ZodString;
                color: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                userId: string;
                name: string;
                color: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
            }, {
                id: string;
                userId: string;
                name: string;
                color: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
            }>;
        };
    };
    getCategoryById: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        summary: "Get category by ID";
        description: "Get category by ID";
        method: "GET";
        path: "/v1/categories/:id";
        responses: {
            200: z.ZodObject<{
                id: z.ZodString;
                userId: z.ZodString;
                name: z.ZodString;
                color: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                userId: string;
                name: string;
                color: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
            }, {
                id: string;
                userId: string;
                name: string;
                color: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
            }>;
        };
    };
    updateCategory: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        summary: "Update category";
        description: "Update category";
        method: "PATCH";
        body: z.ZodObject<{
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            name: z.ZodOptional<z.ZodString>;
            color: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            description?: string | null | undefined;
            name?: string | undefined;
            color?: string | undefined;
        }, {
            description?: string | null | undefined;
            name?: string | undefined;
            color?: string | undefined;
        }>;
        path: "/v1/categories/:id";
        responses: {
            200: z.ZodObject<{
                id: z.ZodString;
                userId: z.ZodString;
                name: z.ZodString;
                color: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                userId: string;
                name: string;
                color: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
            }, {
                id: string;
                userId: string;
                name: string;
                color: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
            }>;
        };
    };
    deleteCategory: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        summary: "Delete category";
        description: "Delete category";
        method: "DELETE";
        path: "/v1/categories/:id";
        responses: {
            204: z.ZodVoid;
        };
    };
};
//# sourceMappingURL=category.d.ts.map