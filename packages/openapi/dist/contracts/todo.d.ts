import z from "zod";
export declare const todoContract: {
    getTodos: {
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
            sort: z.ZodOptional<z.ZodEnum<["created_at", "updated_at", "title", "priority", "due_date", "status"]>>;
            order: z.ZodOptional<z.ZodEnum<["asc", "desc"]>>;
            search: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodEnum<["draft", "active", "completed", "archived"]>>;
            priority: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
            categoryId: z.ZodOptional<z.ZodString>;
            parentTodoId: z.ZodOptional<z.ZodString>;
            dueFrom: z.ZodOptional<z.ZodString>;
            dueTo: z.ZodOptional<z.ZodString>;
            overdue: z.ZodOptional<z.ZodBoolean>;
            completed: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            sort?: "status" | "created_at" | "updated_at" | "title" | "priority" | "due_date" | undefined;
            status?: "draft" | "active" | "completed" | "archived" | undefined;
            search?: string | undefined;
            page?: number | undefined;
            limit?: number | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            order?: "asc" | "desc" | undefined;
            completed?: boolean | undefined;
            categoryId?: string | undefined;
            parentTodoId?: string | undefined;
            dueFrom?: string | undefined;
            dueTo?: string | undefined;
            overdue?: boolean | undefined;
        }, {
            sort?: "status" | "created_at" | "updated_at" | "title" | "priority" | "due_date" | undefined;
            status?: "draft" | "active" | "completed" | "archived" | undefined;
            search?: string | undefined;
            page?: number | undefined;
            limit?: number | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            order?: "asc" | "desc" | undefined;
            completed?: boolean | undefined;
            categoryId?: string | undefined;
            parentTodoId?: string | undefined;
            dueFrom?: string | undefined;
            dueTo?: string | undefined;
            overdue?: boolean | undefined;
        }>;
        summary: "Get all todos";
        description: "Get all todos";
        method: "GET";
        path: "/v1/todos";
        responses: {
            200: z.ZodType<import("@TODO_TASKER/zod").PaginatedResponse<{
                id: string;
                userId: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "active" | "completed" | "archived";
                title: string;
                priority: "low" | "medium" | "high";
                dueDate: string | null;
                completedAt: string | null;
                parentTodoId: string | null;
                categoryId: string | null;
                metadata: {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                } | null;
                sortOrder: number;
                category: {
                    id: string;
                    userId: string;
                    name: string;
                    color: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
                } | null;
                children: {
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
                    status: "draft" | "active" | "completed" | "archived";
                    title: string;
                    priority: "low" | "medium" | "high";
                    dueDate: string | null;
                    completedAt: string | null;
                    parentTodoId: string | null;
                    categoryId: string | null;
                    metadata: {
                        color?: string | undefined;
                        tags?: string[] | undefined;
                        reminder?: string | undefined;
                        difficulty?: number | undefined;
                    } | null;
                    sortOrder: number;
                }[];
                comments: {
                    id: string;
                    userId: string;
                    createdAt: string;
                    updatedAt: string;
                    todoId: string;
                    content: string;
                }[];
                attachments: {
                    id: string;
                    name: string;
                    createdAt: string;
                    updatedAt: string;
                    todoId: string;
                    uploadedBy: string;
                    downloadKey: string;
                    fileSize: number | null;
                    mimeType: string | null;
                }[];
            }>, z.ZodTypeDef, import("@TODO_TASKER/zod").PaginatedResponse<{
                id: string;
                userId: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "active" | "completed" | "archived";
                title: string;
                priority: "low" | "medium" | "high";
                dueDate: string | null;
                completedAt: string | null;
                parentTodoId: string | null;
                categoryId: string | null;
                metadata: {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                } | null;
                sortOrder: number;
                category: {
                    id: string;
                    userId: string;
                    name: string;
                    color: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
                } | null;
                children: {
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
                    status: "draft" | "active" | "completed" | "archived";
                    title: string;
                    priority: "low" | "medium" | "high";
                    dueDate: string | null;
                    completedAt: string | null;
                    parentTodoId: string | null;
                    categoryId: string | null;
                    metadata: {
                        color?: string | undefined;
                        tags?: string[] | undefined;
                        reminder?: string | undefined;
                        difficulty?: number | undefined;
                    } | null;
                    sortOrder: number;
                }[];
                comments: {
                    id: string;
                    userId: string;
                    createdAt: string;
                    updatedAt: string;
                    todoId: string;
                    content: string;
                }[];
                attachments: {
                    id: string;
                    name: string;
                    createdAt: string;
                    updatedAt: string;
                    todoId: string;
                    uploadedBy: string;
                    downloadKey: string;
                    fileSize: number | null;
                    mimeType: string | null;
                }[];
            }>>;
        };
    };
    createTodo: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        summary: "Create a new todo";
        description: "Create a new todo";
        method: "POST";
        body: z.ZodObject<{
            metadata: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                reminder: z.ZodOptional<z.ZodString>;
                color: z.ZodOptional<z.ZodString>;
                difficulty: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                color?: string | undefined;
                tags?: string[] | undefined;
                reminder?: string | undefined;
                difficulty?: number | undefined;
            }, {
                color?: string | undefined;
                tags?: string[] | undefined;
                reminder?: string | undefined;
                difficulty?: number | undefined;
            }>>>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            title: z.ZodString;
            priority: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
            categoryId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            parentTodoId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            dueDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            title: string;
            metadata?: {
                color?: string | undefined;
                tags?: string[] | undefined;
                reminder?: string | undefined;
                difficulty?: number | undefined;
            } | null | undefined;
            description?: string | null | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            categoryId?: string | null | undefined;
            parentTodoId?: string | null | undefined;
            dueDate?: string | null | undefined;
        }, {
            title: string;
            metadata?: {
                color?: string | undefined;
                tags?: string[] | undefined;
                reminder?: string | undefined;
                difficulty?: number | undefined;
            } | null | undefined;
            description?: string | null | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            categoryId?: string | null | undefined;
            parentTodoId?: string | null | undefined;
            dueDate?: string | null | undefined;
        }>;
        path: "/v1/todos";
        responses: {
            201: z.ZodObject<{
                id: z.ZodString;
                userId: z.ZodString;
                title: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                status: z.ZodEnum<["draft", "active", "completed", "archived"]>;
                priority: z.ZodEnum<["low", "medium", "high"]>;
                dueDate: z.ZodNullable<z.ZodString>;
                completedAt: z.ZodNullable<z.ZodString>;
                parentTodoId: z.ZodNullable<z.ZodString>;
                categoryId: z.ZodNullable<z.ZodString>;
                metadata: z.ZodNullable<z.ZodObject<{
                    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    reminder: z.ZodOptional<z.ZodString>;
                    color: z.ZodOptional<z.ZodString>;
                    difficulty: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                }, {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                }>>;
                sortOrder: z.ZodNumber;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                userId: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "active" | "completed" | "archived";
                title: string;
                priority: "low" | "medium" | "high";
                dueDate: string | null;
                completedAt: string | null;
                parentTodoId: string | null;
                categoryId: string | null;
                metadata: {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                } | null;
                sortOrder: number;
            }, {
                id: string;
                userId: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "active" | "completed" | "archived";
                title: string;
                priority: "low" | "medium" | "high";
                dueDate: string | null;
                completedAt: string | null;
                parentTodoId: string | null;
                categoryId: string | null;
                metadata: {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                } | null;
                sortOrder: number;
            }>;
        };
    };
    getTodoById: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        summary: "Get todo by ID";
        description: "Get todo by ID";
        method: "GET";
        path: "/v1/todos/:id";
        responses: {
            200: z.ZodObject<{
                id: z.ZodString;
                userId: z.ZodString;
                title: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                status: z.ZodEnum<["draft", "active", "completed", "archived"]>;
                priority: z.ZodEnum<["low", "medium", "high"]>;
                dueDate: z.ZodNullable<z.ZodString>;
                completedAt: z.ZodNullable<z.ZodString>;
                parentTodoId: z.ZodNullable<z.ZodString>;
                categoryId: z.ZodNullable<z.ZodString>;
                metadata: z.ZodNullable<z.ZodObject<{
                    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    reminder: z.ZodOptional<z.ZodString>;
                    color: z.ZodOptional<z.ZodString>;
                    difficulty: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                }, {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                }>>;
                sortOrder: z.ZodNumber;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
            } & {
                category: z.ZodNullable<z.ZodObject<{
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
                }>>;
                children: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    userId: z.ZodString;
                    title: z.ZodString;
                    description: z.ZodNullable<z.ZodString>;
                    status: z.ZodEnum<["draft", "active", "completed", "archived"]>;
                    priority: z.ZodEnum<["low", "medium", "high"]>;
                    dueDate: z.ZodNullable<z.ZodString>;
                    completedAt: z.ZodNullable<z.ZodString>;
                    parentTodoId: z.ZodNullable<z.ZodString>;
                    categoryId: z.ZodNullable<z.ZodString>;
                    metadata: z.ZodNullable<z.ZodObject<{
                        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                        reminder: z.ZodOptional<z.ZodString>;
                        color: z.ZodOptional<z.ZodString>;
                        difficulty: z.ZodOptional<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        color?: string | undefined;
                        tags?: string[] | undefined;
                        reminder?: string | undefined;
                        difficulty?: number | undefined;
                    }, {
                        color?: string | undefined;
                        tags?: string[] | undefined;
                        reminder?: string | undefined;
                        difficulty?: number | undefined;
                    }>>;
                    sortOrder: z.ZodNumber;
                    createdAt: z.ZodString;
                    updatedAt: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
                    status: "draft" | "active" | "completed" | "archived";
                    title: string;
                    priority: "low" | "medium" | "high";
                    dueDate: string | null;
                    completedAt: string | null;
                    parentTodoId: string | null;
                    categoryId: string | null;
                    metadata: {
                        color?: string | undefined;
                        tags?: string[] | undefined;
                        reminder?: string | undefined;
                        difficulty?: number | undefined;
                    } | null;
                    sortOrder: number;
                }, {
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
                    status: "draft" | "active" | "completed" | "archived";
                    title: string;
                    priority: "low" | "medium" | "high";
                    dueDate: string | null;
                    completedAt: string | null;
                    parentTodoId: string | null;
                    categoryId: string | null;
                    metadata: {
                        color?: string | undefined;
                        tags?: string[] | undefined;
                        reminder?: string | undefined;
                        difficulty?: number | undefined;
                    } | null;
                    sortOrder: number;
                }>, "many">;
                comments: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    todoId: z.ZodString;
                    userId: z.ZodString;
                    content: z.ZodString;
                    createdAt: z.ZodString;
                    updatedAt: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    userId: string;
                    createdAt: string;
                    updatedAt: string;
                    todoId: string;
                    content: string;
                }, {
                    id: string;
                    userId: string;
                    createdAt: string;
                    updatedAt: string;
                    todoId: string;
                    content: string;
                }>, "many">;
                attachments: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    todoId: z.ZodString;
                    name: z.ZodString;
                    uploadedBy: z.ZodString;
                    downloadKey: z.ZodString;
                    fileSize: z.ZodNullable<z.ZodNumber>;
                    mimeType: z.ZodNullable<z.ZodString>;
                    createdAt: z.ZodString;
                    updatedAt: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    name: string;
                    createdAt: string;
                    updatedAt: string;
                    todoId: string;
                    uploadedBy: string;
                    downloadKey: string;
                    fileSize: number | null;
                    mimeType: string | null;
                }, {
                    id: string;
                    name: string;
                    createdAt: string;
                    updatedAt: string;
                    todoId: string;
                    uploadedBy: string;
                    downloadKey: string;
                    fileSize: number | null;
                    mimeType: string | null;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                id: string;
                userId: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "active" | "completed" | "archived";
                title: string;
                priority: "low" | "medium" | "high";
                dueDate: string | null;
                completedAt: string | null;
                parentTodoId: string | null;
                categoryId: string | null;
                metadata: {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                } | null;
                sortOrder: number;
                category: {
                    id: string;
                    userId: string;
                    name: string;
                    color: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
                } | null;
                children: {
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
                    status: "draft" | "active" | "completed" | "archived";
                    title: string;
                    priority: "low" | "medium" | "high";
                    dueDate: string | null;
                    completedAt: string | null;
                    parentTodoId: string | null;
                    categoryId: string | null;
                    metadata: {
                        color?: string | undefined;
                        tags?: string[] | undefined;
                        reminder?: string | undefined;
                        difficulty?: number | undefined;
                    } | null;
                    sortOrder: number;
                }[];
                comments: {
                    id: string;
                    userId: string;
                    createdAt: string;
                    updatedAt: string;
                    todoId: string;
                    content: string;
                }[];
                attachments: {
                    id: string;
                    name: string;
                    createdAt: string;
                    updatedAt: string;
                    todoId: string;
                    uploadedBy: string;
                    downloadKey: string;
                    fileSize: number | null;
                    mimeType: string | null;
                }[];
            }, {
                id: string;
                userId: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "active" | "completed" | "archived";
                title: string;
                priority: "low" | "medium" | "high";
                dueDate: string | null;
                completedAt: string | null;
                parentTodoId: string | null;
                categoryId: string | null;
                metadata: {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                } | null;
                sortOrder: number;
                category: {
                    id: string;
                    userId: string;
                    name: string;
                    color: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
                } | null;
                children: {
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
                    status: "draft" | "active" | "completed" | "archived";
                    title: string;
                    priority: "low" | "medium" | "high";
                    dueDate: string | null;
                    completedAt: string | null;
                    parentTodoId: string | null;
                    categoryId: string | null;
                    metadata: {
                        color?: string | undefined;
                        tags?: string[] | undefined;
                        reminder?: string | undefined;
                        difficulty?: number | undefined;
                    } | null;
                    sortOrder: number;
                }[];
                comments: {
                    id: string;
                    userId: string;
                    createdAt: string;
                    updatedAt: string;
                    todoId: string;
                    content: string;
                }[];
                attachments: {
                    id: string;
                    name: string;
                    createdAt: string;
                    updatedAt: string;
                    todoId: string;
                    uploadedBy: string;
                    downloadKey: string;
                    fileSize: number | null;
                    mimeType: string | null;
                }[];
            }>;
        };
    };
    updateTodo: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        summary: "Update todo";
        description: "Update todo";
        method: "PATCH";
        body: z.ZodObject<{
            metadata: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                reminder: z.ZodOptional<z.ZodString>;
                color: z.ZodOptional<z.ZodString>;
                difficulty: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                color?: string | undefined;
                tags?: string[] | undefined;
                reminder?: string | undefined;
                difficulty?: number | undefined;
            }, {
                color?: string | undefined;
                tags?: string[] | undefined;
                reminder?: string | undefined;
                difficulty?: number | undefined;
            }>>>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            status: z.ZodOptional<z.ZodEnum<["draft", "active", "completed", "archived"]>>;
            title: z.ZodOptional<z.ZodString>;
            priority: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
            categoryId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            parentTodoId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            dueDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            metadata?: {
                color?: string | undefined;
                tags?: string[] | undefined;
                reminder?: string | undefined;
                difficulty?: number | undefined;
            } | null | undefined;
            description?: string | null | undefined;
            status?: "draft" | "active" | "completed" | "archived" | undefined;
            title?: string | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            categoryId?: string | null | undefined;
            parentTodoId?: string | null | undefined;
            dueDate?: string | null | undefined;
        }, {
            metadata?: {
                color?: string | undefined;
                tags?: string[] | undefined;
                reminder?: string | undefined;
                difficulty?: number | undefined;
            } | null | undefined;
            description?: string | null | undefined;
            status?: "draft" | "active" | "completed" | "archived" | undefined;
            title?: string | undefined;
            priority?: "low" | "medium" | "high" | undefined;
            categoryId?: string | null | undefined;
            parentTodoId?: string | null | undefined;
            dueDate?: string | null | undefined;
        }>;
        path: "/v1/todos/:id";
        responses: {
            200: z.ZodObject<{
                id: z.ZodString;
                userId: z.ZodString;
                title: z.ZodString;
                description: z.ZodNullable<z.ZodString>;
                status: z.ZodEnum<["draft", "active", "completed", "archived"]>;
                priority: z.ZodEnum<["low", "medium", "high"]>;
                dueDate: z.ZodNullable<z.ZodString>;
                completedAt: z.ZodNullable<z.ZodString>;
                parentTodoId: z.ZodNullable<z.ZodString>;
                categoryId: z.ZodNullable<z.ZodString>;
                metadata: z.ZodNullable<z.ZodObject<{
                    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                    reminder: z.ZodOptional<z.ZodString>;
                    color: z.ZodOptional<z.ZodString>;
                    difficulty: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                }, {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                }>>;
                sortOrder: z.ZodNumber;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                userId: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "active" | "completed" | "archived";
                title: string;
                priority: "low" | "medium" | "high";
                dueDate: string | null;
                completedAt: string | null;
                parentTodoId: string | null;
                categoryId: string | null;
                metadata: {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                } | null;
                sortOrder: number;
            }, {
                id: string;
                userId: string;
                description: string | null;
                createdAt: string;
                updatedAt: string;
                status: "draft" | "active" | "completed" | "archived";
                title: string;
                priority: "low" | "medium" | "high";
                dueDate: string | null;
                completedAt: string | null;
                parentTodoId: string | null;
                categoryId: string | null;
                metadata: {
                    color?: string | undefined;
                    tags?: string[] | undefined;
                    reminder?: string | undefined;
                    difficulty?: number | undefined;
                } | null;
                sortOrder: number;
            }>;
        };
    };
    deleteTodo: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        summary: "Delete todo";
        description: "Delete todo";
        method: "DELETE";
        path: "/v1/todos/:id";
        responses: {
            204: z.ZodVoid;
        };
    };
    getTodoStats: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        summary: "Get todo statistics";
        description: "Get todo statistics";
        method: "GET";
        path: "/v1/todos/stats";
        responses: {
            200: z.ZodObject<{
                total: z.ZodNumber;
                draft: z.ZodNumber;
                active: z.ZodNumber;
                completed: z.ZodNumber;
                archived: z.ZodNumber;
                overdue: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                draft: number;
                active: number;
                completed: number;
                archived: number;
                total: number;
                overdue: number;
            }, {
                draft: number;
                active: number;
                completed: number;
                archived: number;
                total: number;
                overdue: number;
            }>;
        };
    };
    uploadTodoAttachment: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        summary: "Upload attachment to todo";
        description: "Upload a file attachment to a todo";
        method: "POST";
        contentType: "multipart/form-data";
        body: z.ZodObject<{
            file: z.ZodObject<{
                type: z.ZodLiteral<"file">;
            }, "strip", z.ZodTypeAny, {
                type: "file";
            }, {
                type: "file";
            }>;
        }, "strip", z.ZodTypeAny, {
            file: {
                type: "file";
            };
        }, {
            file: {
                type: "file";
            };
        }>;
        path: "/v1/todos/:id/attachments";
        responses: {
            201: z.ZodObject<{
                id: z.ZodString;
                todoId: z.ZodString;
                name: z.ZodString;
                uploadedBy: z.ZodString;
                downloadKey: z.ZodString;
                fileSize: z.ZodNullable<z.ZodNumber>;
                mimeType: z.ZodNullable<z.ZodString>;
                createdAt: z.ZodString;
                updatedAt: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                todoId: string;
                uploadedBy: string;
                downloadKey: string;
                fileSize: number | null;
                mimeType: string | null;
            }, {
                id: string;
                name: string;
                createdAt: string;
                updatedAt: string;
                todoId: string;
                uploadedBy: string;
                downloadKey: string;
                fileSize: number | null;
                mimeType: string | null;
            }>;
        };
    };
    deleteTodoAttachment: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        summary: "Delete todo attachment";
        description: "Delete a file attachment from a todo";
        method: "DELETE";
        path: "/v1/todos/:id/attachments/:attachmentId";
        responses: {
            204: z.ZodVoid;
        };
    };
    getAttachmentPresignedURL: {
        metadata: {
            openApiSecurity?: {
                bearerAuth: never[];
            }[] | {
                "x-service-token": never[];
            }[] | undefined;
        };
        summary: "Get attachment download URL";
        description: "Get a presigned URL to download an attachment";
        method: "GET";
        path: "/v1/todos/:id/attachments/:attachmentId/download";
        responses: {
            200: z.ZodObject<{
                url: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                url: string;
            }, {
                url: string;
            }>;
        };
    };
};
//# sourceMappingURL=todo.d.ts.map