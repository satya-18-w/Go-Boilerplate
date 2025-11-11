import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);
import { generateOpenApi } from "@ts-rest/open-api";
import { apiContract } from "./contracts/index.js";
const hasSecurity = (metadata) => {
    return (!!metadata && typeof metadata === "object" && "openApiSecurity" in metadata);
};
const operationMapper = (operation, appRoute) => ({
    ...operation,
    ...(hasSecurity(appRoute.metadata)
        ? {
            security: appRoute.metadata.openApiSecurity,
        }
        : {}),
});
export const OpenAPI = Object.assign(generateOpenApi(apiContract, {
    openapi: "3.0.2",
    info: {
        version: "1.0.0",
        title: "Boilerplate REST API - Documentation",
        description: "Boilerplate REST API - Documentation",
    },
    servers: [
        {
            url: "http://localhost:8080/api",
            description: "Local Server",
        },
    ],
}, {
    operationMapper,
    setOperationId: true,
}), {
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
            "x-service-token": {
                type: "apiKey",
                name: "x-service-token",
                in: "header",
            },
        },
    },
});
//# sourceMappingURL=index.js.map