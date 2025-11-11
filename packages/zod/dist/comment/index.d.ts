import z from "zod";
export declare const ZTodoComment: z.ZodObject<{
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
//# sourceMappingURL=index.d.ts.map