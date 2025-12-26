import { env } from "@/config/env";

type FetchOptions = RequestInit & {
    token?: string | null;
};

export async function fetchClient(endpoint: string, options: FetchOptions = {}) {
    const { token, headers, ...rest } = options;

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    const config = {
        ...rest,
        headers: {
            ...defaultHeaders,
            ...headers,
        },
    };

    const response = await fetch(`${env.VITE_API_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "API request failed");
    }

    // Handle 204 No Content
    if (response.status === 204) {
        return null;
    }

    return response.json();
}
