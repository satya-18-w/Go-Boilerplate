import { z } from "zod";
export type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};
export declare const schemaWithPagination: <T>(schema: z.ZodSchema<T>) => z.ZodSchema<PaginatedResponse<T>>;
//# sourceMappingURL=utils.d.ts.map