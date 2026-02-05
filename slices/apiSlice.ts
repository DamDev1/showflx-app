import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Token {
    accessToken?: string;
    refreshToken?: string;
}

interface ErrorResponse {
    status: number;
    data: { message: string };
}

const getAuthToken = (): Token | null => {

    try {
        const token = localStorage.getItem("showflx-auth");
        if (token) {
            return JSON.parse(token);
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const baseQuery = fetchBaseQuery({
    baseUrl: "https://api.showflx.com/api/v1",
});

const baseQueryWithAuth: BaseQueryFn = async (args, api, extraOptions) => {
    const token = getAuthToken();

    const requestArgs = typeof args === 'string' ? { url: args, headers: {} } : { ...args, headers: { ...args.headers } };

    if (token?.accessToken) {
        requestArgs.headers['Authorization'] = `Bearer ${token.accessToken}`;
    }
    if (token?.refreshToken) {
        requestArgs.headers['x-refresh'] = token.refreshToken;
    }
    requestArgs.headers['x-request-source'] = 'mobile';

    const result = await baseQuery(requestArgs, api, extraOptions);

    if (result.error) {
        return {
            error: {
                status: result.error.status || 'FETCH_ERROR',
                data: { message: (result.error.data as ErrorResponse) || 'An error occurred' },
            },
        };
    }

    return result;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['user', 'producer', 'admin'],
    endpoints: () => ({}),
});