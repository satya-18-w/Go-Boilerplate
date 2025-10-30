import { z } from "zod";
export const schemaWithPagination = (schema) => z.object({
    data: z.array(schema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
});
//# sourceMappingURL=utils.js.map