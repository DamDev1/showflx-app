import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Token {
    accessToken?: string;
    refreshToken?: string;
}

interface ErrorResponse {
    status: number;
    data: { message: string };
}

const getAuthToken = async (): Promise<Token | null> => {
  try {
    const storedToken = await AsyncStorage.getItem('showflx-auth');
    if (!storedToken) return null;

    const parsedToken = JSON.parse(storedToken);
    return parsedToken ? { accessToken: parsedToken.token, refreshToken: parsedToken.refreshToken } : null;
  } catch {
    return null;
  }
};

const baseQuery = fetchBaseQuery({
    baseUrl: "http://172.20.10.3:3000/api",
    prepareHeaders: async (headers) => {
        const token = await getAuthToken();
        if (token) {
            headers.set('Authorization', `Bearer ${token.accessToken}`);
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