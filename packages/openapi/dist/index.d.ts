import { generateOpenApi } from "@ts-rest/open-api";
export type OperationMapper = NonNullable<Parameters<typeof generateOpenApi>[2]>["operationMapper"];
export declare const OpenAPI: import("openapi3-ts").OpenAPIObject & {
    components: {
        securitySchemes: {
            bearerAuth: {
                type: string;
                scheme: string;
                bearerFormat: string;
            };
            "x-service-token": {
                type: string;
                name: string;
                in: string;
            };
        };
    };
};
//# sourceMappingURL=index.d.ts.map