export declare const getSecurityMetadata: ({ security, securityType, }?: {
    security?: boolean;
    securityType?: "bearer" | "service";
}) => {
    openApiSecurity?: {
        bearerAuth: never[];
    }[] | {
        "x-service-token": never[];
    }[] | undefined;
};
//# sourceMappingURL=utils.d.ts.map