import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ZHealthResponse } from "@boilerplate/zod";
const c = initContract();
export const healthContract = c.router({
    getHealth: {
        summary: "Get health",
        path: "/status",
        method: "GET",
        description: "Get health status",
        responses: {
            200: ZHealthResponse,
        },
    },
});
//# sourceMappingURL=health.js.map