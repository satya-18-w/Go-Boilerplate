import { z } from "zod";
export declare const ZHealthResponse: z.ZodObject<{
    status: z.ZodEnum<["healthy", "unhealthy"]>;
    timestamp: z.ZodString;
    environment: z.ZodString;
    checks: z.ZodObject<{
        database: z.ZodObject<{
            status: z.ZodString;
            response_time: z.ZodString;
            error: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            status: string;
            response_time: string;
            error?: string | undefined;
        }, {
            status: string;
            response_time: string;
            error?: string | undefined;
        }>;
        redis: z.ZodOptional<z.ZodObject<{
            status: z.ZodString;
            response_time: z.ZodString;
            error: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            status: string;
            response_time: string;
            error?: string | undefined;
        }, {
            status: string;
            response_time: string;
            error?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
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
}, "strip", z.ZodTypeAny, {
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
//# sourceMappingURL=health.d.ts.map