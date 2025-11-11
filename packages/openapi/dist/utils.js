import { match } from "ts-pattern";
export const getSecurityMetadata = ({ security = true, securityType = "bearer", } = {}) => {
    const openApiSecurity = match(securityType)
        .with("bearer", () => [
        {
            bearerAuth: [],
        },
    ])
        .with("service", () => [
        {
            "x-service-token": [],
        },
    ])
        .exhaustive();
    return {
        ...(security && { openApiSecurity }),
    };
};
//# sourceMappingURL=utils.js.map