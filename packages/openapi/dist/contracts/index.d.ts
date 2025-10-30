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
};
//# sourceMappingURL=index.d.ts.map