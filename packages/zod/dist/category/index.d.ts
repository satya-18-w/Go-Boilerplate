import z from "zod";
export declare const ZTodoCategory: z.ZodObject<{
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
//# sourceMappingURL=index.d.ts.map