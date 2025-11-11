import z from "zod";
export declare const commentContract: {
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
        body: z.ZodObject<Pick<{
            id: z.ZodString;
            todoId: z.ZodString;
            userId: z.ZodString;
            content: z.ZodString;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "content">, "strip", z.ZodTypeAny, {
            content: string;
        }, {
            content: string;
        }>;
        path: "/v1/todos/:id/comments";
        responses: {
            201: z.ZodObject<{
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
            200: z.ZodArray<z.ZodObject<{
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
        body: z.ZodObject<Pick<{
            id: z.ZodString;
            todoId: z.ZodString;
            userId: z.ZodString;
            content: z.ZodString;
            createdAt: z.ZodString;
            updatedAt: z.ZodString;
        }, "content">, "strip", z.ZodTypeAny, {
            content: string;
        }, {
            content: string;
        }>;
        path: "/v1/comments/:id";
        responses: {
            200: z.ZodObject<{
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
            204: z.ZodVoid;
        };
    };
};
//# sourceMappingURL=comment.d.ts.map