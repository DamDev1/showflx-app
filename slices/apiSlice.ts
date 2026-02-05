import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Token {
    accessToken?: string;
    refreshToken?: string;
}

interface ErrorResponse {
    status: number;
    data: { message: string };
}

const baseQuery = fetchBaseQuery({
    baseUrl: "https://api.showflx.com/api/v1",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('x-request-source', 'mobile');
        return headers;
    },
});

const baseQueryWithAuth: BaseQueryFn = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

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