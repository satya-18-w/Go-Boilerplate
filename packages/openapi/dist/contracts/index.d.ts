export declare const apiContract: {
    Health: {
        getHealth: {
            summary: "Get health";
            description: "Get health status";
            method: "GET";
            path: "/status";
            responses: {
                200: import("zod").ZodObject<{
                    status: import("zod").ZodEnum<["healthy", "unhealthy"]>;
                    timestamp: import("zod").ZodString;
                    environment: import("zod").ZodString;
                    checks: import("zod").ZodObject<{
                        database: import("zod").ZodObject<{
                            status: import("zod").ZodString;
                            response_time: import("zod").ZodString;
                            error: import("zod").ZodOptional<import("zod").ZodString>;
                        }, "strip", import("zod").ZodTypeAny, {
                            status: string;
                            response_time: string;
                            error?: string | undefined;
                        }, {
                            status: string;
                            response_time: string;
                            error?: string | undefined;
                        }>;
                        redis: import("zod").ZodOptional<import("zod").ZodObject<{
                            status: import("zod").ZodString;
                            response_time: import("zod").ZodString;
                            error: import("zod").ZodOptional<import("zod").ZodString>;
                        }, "strip", import("zod").ZodTypeAny, {
                            status: string;
                            response_time: string;
                            error?: string | undefined;
                        }, {
                            status: string;
                            response_time: string;
                            error?: string | undefined;
                        }>>;
                    }, "strip", import("zod").ZodTypeAny, {
                        database: {
                            status: string;
                            response_time: string;
                            error?: string | undefined;
                        };
                        redis?: {
                            status: string;
                            response_time: string;
                            error?: string | undefined;
                        } | undefined;
                    }, {
                        database: {
                            status: string;
                            response_time: string;
                            error?: string | undefined;
                        };
                        redis?: {
                            status: string;
                            response_time: string;
                            error?: string | undefined;
                        } | undefined;
                    }>;
                }, "strip", import("zod").ZodTypeAny, {
                    status: "healthy" | "unhealthy";
                    timestamp: string;
                    environment: string;
                    checks: {
                        database: {
                            status: string;
                            response_time: string;
                            error?: string | undefined;
                        };
                        redis?: {
                            status: string;
                            response_time: string;
                            error?: string | undefined;
                        } | undefined;
                    };
                }, {
                    status: "healthy" | "unhealthy";
                    timestamp: string;
                    environment: string;
                    checks: {
                        database: {
                            status: string;
                            response_time: string;
                            error?: string | undefined;
                        };
                        redis?: {
                            status: string;
                            response_time: string;
                            error?: string | undefined;
                        } | undefined;
                    };
                }>;
            };
        };
    };
    Todo: {
        getTodos: {
            metadata: {
                openApiSecurity?: {
                    bearerAuth: never[];
                }[] | {
                    "x-service-token": never[];
                }[] | undefined;
            };
            query: import("zod").ZodObject<{
                page: import("zod").ZodOptional<import("zod").ZodNumber>;
                limit: import("zod").ZodOptional<import("zod").ZodNumber>;
                sort: import("zod").ZodOptional<import("zod").ZodEnum<["created_at", "updated_at", "title", "priority", "due_date", "status"]>>;
                order: import("zod").ZodOptional<import("zod").ZodEnum<["asc", "desc"]>>;
                search: import("zod").ZodOptional<import("zod").ZodString>;
                status: import("zod").ZodOptional<import("zod").ZodEnum<["draft", "active", "completed", "archived"]>>;
                priority: import("zod").ZodOptional<import("zod").ZodEnum<["low", "medium", "high"]>>;
                categoryId: import("zod").ZodOptional<import("zod").ZodString>;
                parentTodoId: import("zod").ZodOptional<import("zod").ZodString>;
                dueFrom: import("zod").ZodOptional<import("zod").ZodString>;
                dueTo: import("zod").ZodOptional<import("zod").ZodString>;
                overdue: import("zod").ZodOptional<import("zod").ZodBoolean>;
                completed: import("zod").ZodOptional<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
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
                200: import("zod").ZodSchema<import("@TODO_TASKER/zod").PaginatedResponse<{
                    status: "draft" | "active" | "completed" | "archived";
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
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
                        status: "draft" | "active" | "completed" | "archived";
                        id: string;
                        userId: string;
                        description: string | null;
                        createdAt: string;
                        updatedAt: string;
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
                }>, import("zod").ZodTypeDef, import("@TODO_TASKER/zod").PaginatedResponse<{
                    status: "draft" | "active" | "completed" | "archived";
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
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
                        status: "draft" | "active" | "completed" | "archived";
                        id: string;
                        userId: string;
                        description: string | null;
                        createdAt: string;
                        updatedAt: string;
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
            body: import("zod").ZodObject<{
                metadata: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodObject<{
                    tags: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    reminder: import("zod").ZodOptional<import("zod").ZodString>;
                    color: import("zod").ZodOptional<import("zod").ZodString>;
                    difficulty: import("zod").ZodOptional<import("zod").ZodNumber>;
                }, "strip", import("zod").ZodTypeAny, {
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
                description: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
                title: import("zod").ZodString;
                priority: import("zod").ZodOptional<import("zod").ZodEnum<["low", "medium", "high"]>>;
                categoryId: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
                parentTodoId: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
                dueDate: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
            }, "strip", import("zod").ZodTypeAny, {
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
                201: import("zod").ZodObject<{
                    id: import("zod").ZodString;
                    userId: import("zod").ZodString;
                    title: import("zod").ZodString;
                    description: import("zod").ZodNullable<import("zod").ZodString>;
                    status: import("zod").ZodEnum<["draft", "active", "completed", "archived"]>;
                    priority: import("zod").ZodEnum<["low", "medium", "high"]>;
                    dueDate: import("zod").ZodNullable<import("zod").ZodString>;
                    completedAt: import("zod").ZodNullable<import("zod").ZodString>;
                    parentTodoId: import("zod").ZodNullable<import("zod").ZodString>;
                    categoryId: import("zod").ZodNullable<import("zod").ZodString>;
                    metadata: import("zod").ZodNullable<import("zod").ZodObject<{
                        tags: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                        reminder: import("zod").ZodOptional<import("zod").ZodString>;
                        color: import("zod").ZodOptional<import("zod").ZodString>;
                        difficulty: import("zod").ZodOptional<import("zod").ZodNumber>;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    sortOrder: import("zod").ZodNumber;
                    createdAt: import("zod").ZodString;
                    updatedAt: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
                    status: "draft" | "active" | "completed" | "archived";
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
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
                    status: "draft" | "active" | "completed" | "archived";
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
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
                200: import("zod").ZodObject<{
                    id: import("zod").ZodString;
                    userId: import("zod").ZodString;
                    title: import("zod").ZodString;
                    description: import("zod").ZodNullable<import("zod").ZodString>;
                    status: import("zod").ZodEnum<["draft", "active", "completed", "archived"]>;
                    priority: import("zod").ZodEnum<["low", "medium", "high"]>;
                    dueDate: import("zod").ZodNullable<import("zod").ZodString>;
                    completedAt: import("zod").ZodNullable<import("zod").ZodString>;
                    parentTodoId: import("zod").ZodNullable<import("zod").ZodString>;
                    categoryId: import("zod").ZodNullable<import("zod").ZodString>;
                    metadata: import("zod").ZodNullable<import("zod").ZodObject<{
                        tags: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                        reminder: import("zod").ZodOptional<import("zod").ZodString>;
                        color: import("zod").ZodOptional<import("zod").ZodString>;
                        difficulty: import("zod").ZodOptional<import("zod").ZodNumber>;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    sortOrder: import("zod").ZodNumber;
                    createdAt: import("zod").ZodString;
                    updatedAt: import("zod").ZodString;
                } & {
                    category: import("zod").ZodNullable<import("zod").ZodObject<{
                        id: import("zod").ZodString;
                        userId: import("zod").ZodString;
                        name: import("zod").ZodString;
                        color: import("zod").ZodString;
                        description: import("zod").ZodNullable<import("zod").ZodString>;
                        createdAt: import("zod").ZodString;
                        updatedAt: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    children: import("zod").ZodArray<import("zod").ZodObject<{
                        id: import("zod").ZodString;
                        userId: import("zod").ZodString;
                        title: import("zod").ZodString;
                        description: import("zod").ZodNullable<import("zod").ZodString>;
                        status: import("zod").ZodEnum<["draft", "active", "completed", "archived"]>;
                        priority: import("zod").ZodEnum<["low", "medium", "high"]>;
                        dueDate: import("zod").ZodNullable<import("zod").ZodString>;
                        completedAt: import("zod").ZodNullable<import("zod").ZodString>;
                        parentTodoId: import("zod").ZodNullable<import("zod").ZodString>;
                        categoryId: import("zod").ZodNullable<import("zod").ZodString>;
                        metadata: import("zod").ZodNullable<import("zod").ZodObject<{
                            tags: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                            reminder: import("zod").ZodOptional<import("zod").ZodString>;
                            color: import("zod").ZodOptional<import("zod").ZodString>;
                            difficulty: import("zod").ZodOptional<import("zod").ZodNumber>;
                        }, "strip", import("zod").ZodTypeAny, {
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
                        sortOrder: import("zod").ZodNumber;
                        createdAt: import("zod").ZodString;
                        updatedAt: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
                        status: "draft" | "active" | "completed" | "archived";
                        id: string;
                        userId: string;
                        description: string | null;
                        createdAt: string;
                        updatedAt: string;
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
                        status: "draft" | "active" | "completed" | "archived";
                        id: string;
                        userId: string;
                        description: string | null;
                        createdAt: string;
                        updatedAt: string;
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
                    comments: import("zod").ZodArray<import("zod").ZodObject<{
                        id: import("zod").ZodString;
                        todoId: import("zod").ZodString;
                        userId: import("zod").ZodString;
                        content: import("zod").ZodString;
                        createdAt: import("zod").ZodString;
                        updatedAt: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    attachments: import("zod").ZodArray<import("zod").ZodObject<{
                        id: import("zod").ZodString;
                        todoId: import("zod").ZodString;
                        name: import("zod").ZodString;
                        uploadedBy: import("zod").ZodString;
                        downloadKey: import("zod").ZodString;
                        fileSize: import("zod").ZodNullable<import("zod").ZodNumber>;
                        mimeType: import("zod").ZodNullable<import("zod").ZodString>;
                        createdAt: import("zod").ZodString;
                        updatedAt: import("zod").ZodString;
                    }, "strip", import("zod").ZodTypeAny, {
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
                }, "strip", import("zod").ZodTypeAny, {
                    status: "draft" | "active" | "completed" | "archived";
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
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
                        status: "draft" | "active" | "completed" | "archived";
                        id: string;
                        userId: string;
                        description: string | null;
                        createdAt: string;
                        updatedAt: string;
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
                    status: "draft" | "active" | "completed" | "archived";
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
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
                        status: "draft" | "active" | "completed" | "archived";
                        id: string;
                        userId: string;
                        description: string | null;
                        createdAt: string;
                        updatedAt: string;
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
            body: import("zod").ZodObject<{
                metadata: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodObject<{
                    tags: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                    reminder: import("zod").ZodOptional<import("zod").ZodString>;
                    color: import("zod").ZodOptional<import("zod").ZodString>;
                    difficulty: import("zod").ZodOptional<import("zod").ZodNumber>;
                }, "strip", import("zod").ZodTypeAny, {
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
                description: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
                status: import("zod").ZodOptional<import("zod").ZodEnum<["draft", "active", "completed", "archived"]>>;
                title: import("zod").ZodOptional<import("zod").ZodString>;
                priority: import("zod").ZodOptional<import("zod").ZodEnum<["low", "medium", "high"]>>;
                categoryId: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
                parentTodoId: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
                dueDate: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
            }, "strip", import("zod").ZodTypeAny, {
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
                200: import("zod").ZodObject<{
                    id: import("zod").ZodString;
                    userId: import("zod").ZodString;
                    title: import("zod").ZodString;
                    description: import("zod").ZodNullable<import("zod").ZodString>;
                    status: import("zod").ZodEnum<["draft", "active", "completed", "archived"]>;
                    priority: import("zod").ZodEnum<["low", "medium", "high"]>;
                    dueDate: import("zod").ZodNullable<import("zod").ZodString>;
                    completedAt: import("zod").ZodNullable<import("zod").ZodString>;
                    parentTodoId: import("zod").ZodNullable<import("zod").ZodString>;
                    categoryId: import("zod").ZodNullable<import("zod").ZodString>;
                    metadata: import("zod").ZodNullable<import("zod").ZodObject<{
                        tags: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                        reminder: import("zod").ZodOptional<import("zod").ZodString>;
                        color: import("zod").ZodOptional<import("zod").ZodString>;
                        difficulty: import("zod").ZodOptional<import("zod").ZodNumber>;
                    }, "strip", import("zod").ZodTypeAny, {
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
                    sortOrder: import("zod").ZodNumber;
                    createdAt: import("zod").ZodString;
                    updatedAt: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
                    status: "draft" | "active" | "completed" | "archived";
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
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
                    status: "draft" | "active" | "completed" | "archived";
                    id: string;
                    userId: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
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
                204: import("zod").ZodVoid;
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
                200: import("zod").ZodObject<{
                    total: import("zod").ZodNumber;
                    draft: import("zod").ZodNumber;
                    active: import("zod").ZodNumber;
                    completed: import("zod").ZodNumber;
                    archived: import("zod").ZodNumber;
                    overdue: import("zod").ZodNumber;
                }, "strip", import("zod").ZodTypeAny, {
                    total: number;
                    draft: number;
                    active: number;
                    completed: number;
                    archived: number;
                    overdue: number;
                }, {
                    total: number;
                    draft: number;
                    active: number;
                    completed: number;
                    archived: number;
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
            body: import("zod").ZodObject<{
                file: import("zod").ZodObject<{
                    type: import("zod").ZodLiteral<"file">;
                }, "strip", import("zod").ZodTypeAny, {
                    type: "file";
                }, {
                    type: "file";
                }>;
            }, "strip", import("zod").ZodTypeAny, {
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
                201: import("zod").ZodObject<{
                    id: import("zod").ZodString;
                    todoId: import("zod").ZodString;
                    name: import("zod").ZodString;
                    uploadedBy: import("zod").ZodString;
                    downloadKey: import("zod").ZodString;
                    fileSize: import("zod").ZodNullable<import("zod").ZodNumber>;
                    mimeType: import("zod").ZodNullable<import("zod").ZodString>;
                    createdAt: import("zod").ZodString;
                    updatedAt: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
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
                204: import("zod").ZodVoid;
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
                200: import("zod").ZodObject<{
                    url: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
                    url: string;
                }, {
                    url: string;
                }>;
            };
        };
    };
    Comment: {
        addComment: {
            metadata: {
                openApiSecurity?: {
                    bearerAuth: never[];
                }[] | {
                    "x-service-token": never[];
                }[] | undefined;
            };
            summary: "Add comment to todo";
            method: "POST";
            body: import("zod").ZodObject<Pick<{
                id: import("zod").ZodString;
                todoId: import("zod").ZodString;
                userId: import("zod").ZodString;
                content: import("zod").ZodString;
                createdAt: import("zod").ZodString;
                updatedAt: import("zod").ZodString;
            }, "content">, "strip", import("zod").ZodTypeAny, {
                content: string;
            }, {
                content: string;
            }>;
            path: "/v1/todos/:id/comments";
            responses: {
                201: import("zod").ZodObject<{
                    id: import("zod").ZodString;
                    todoId: import("zod").ZodString;
                    userId: import("zod").ZodString;
                    content: import("zod").ZodString;
                    createdAt: import("zod").ZodString;
                    updatedAt: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
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
                }>;
            };
        };
        getCommentsByTodoId: {
            metadata: {
                openApiSecurity?: {
                    bearerAuth: never[];
                }[] | {
                    "x-service-token": never[];
                }[] | undefined;
            };
            summary: "Get comments for todo";
            method: "GET";
            path: "/v1/todos/:id/comments";
            responses: {
                200: import("zod").ZodArray<import("zod").ZodObject<{
                    id: import("zod").ZodString;
                    todoId: import("zod").ZodString;
                    userId: import("zod").ZodString;
                    content: import("zod").ZodString;
                    createdAt: import("zod").ZodString;
                    updatedAt: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
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
            };
        };
        updateComment: {
            metadata: {
                openApiSecurity?: {
                    bearerAuth: never[];
                }[] | {
                    "x-service-token": never[];
                }[] | undefined;
            };
            summary: "Update comment";
            method: "PATCH";
            body: import("zod").ZodObject<Pick<{
                id: import("zod").ZodString;
                todoId: import("zod").ZodString;
                userId: import("zod").ZodString;
                content: import("zod").ZodString;
                createdAt: import("zod").ZodString;
                updatedAt: import("zod").ZodString;
            }, "content">, "strip", import("zod").ZodTypeAny, {
                content: string;
            }, {
                content: string;
            }>;
            path: "/v1/comments/:id";
            responses: {
                200: import("zod").ZodObject<{
                    id: import("zod").ZodString;
                    todoId: import("zod").ZodString;
                    userId: import("zod").ZodString;
                    content: import("zod").ZodString;
                    createdAt: import("zod").ZodString;
                    updatedAt: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
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
                }>;
            };
        };
        deleteComment: {
            metadata: {
                openApiSecurity?: {
                    bearerAuth: never[];
                }[] | {
                    "x-service-token": never[];
                }[] | undefined;
            };
            summary: "Delete comment";
            method: "DELETE";
            path: "/v1/comments/:id";
            responses: {
                204: import("zod").ZodVoid;
            };
        };
    };
    Category: {
        getCategories: {
            metadata: {
                openApiSecurity?: {
                    bearerAuth: never[];
                }[] | {
                    "x-service-token": never[];
                }[] | undefined;
            };
            query: import("zod").ZodObject<{
                page: import("zod").ZodOptional<import("zod").ZodNumber>;
                limit: import("zod").ZodOptional<import("zod").ZodNumber>;
                sort: import("zod").ZodOptional<import("zod").ZodEnum<["created_at", "updated_at", "name"]>>;
                order: import("zod").ZodOptional<import("zod").ZodEnum<["asc", "desc"]>>;
                search: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
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
                200: import("zod").ZodSchema<import("@TODO_TASKER/zod").PaginatedResponse<{
                    id: string;
                    userId: string;
                    name: string;
                    color: string;
                    description: string | null;
                    createdAt: string;
                    updatedAt: string;
                }>, import("zod").ZodTypeDef, import("@TODO_TASKER/zod").PaginatedResponse<{
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
            body: import("zod").ZodObject<{
                description: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
                name: import("zod").ZodString;
                color: import("zod").ZodString;
            }, "strip", import("zod").ZodTypeAny, {
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
                201: import("zod").ZodObject<{
                    id: import("zod").ZodString;
                    userId: import("zod").ZodString;
                    name: import("zod").ZodString;
                    color: import("zod").ZodString;
                    description: import("zod").ZodNullable<import("zod").ZodString>;
                    createdAt: import("zod").ZodString;
                    updatedAt: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
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
                200: import("zod").ZodObject<{
                    id: import("zod").ZodString;
                    userId: import("zod").ZodString;
                    name: import("zod").ZodString;
                    color: import("zod").ZodString;
                    description: import("zod").ZodNullable<import("zod").ZodString>;
                    createdAt: import("zod").ZodString;
                    updatedAt: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
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
            body: import("zod").ZodObject<{
                description: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
                name: import("zod").ZodOptional<import("zod").ZodString>;
                color: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
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
                200: import("zod").ZodObject<{
                    id: import("zod").ZodString;
                    userId: import("zod").ZodString;
                    name: import("zod").ZodString;
                    color: import("zod").ZodString;
                    description: import("zod").ZodNullable<import("zod").ZodString>;
                    createdAt: import("zod").ZodString;
                    updatedAt: import("zod").ZodString;
                }, "strip", import("zod").ZodTypeAny, {
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
                204: import("zod").ZodVoid;
            };
        };
    };
};
//# sourceMappingURL=index.d.ts.map