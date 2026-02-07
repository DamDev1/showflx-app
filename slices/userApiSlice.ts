import { apiSlice } from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/user/auth/login',
                method: 'POST',
                body: data,
            }),
        }),

        signup: builder.mutation({
            query: (data) => ({
                url: '/user/auth/signup',
                method: 'POST',
                body: data,
            }),
        }),

        resendOtp: builder.mutation({
            query: (data) => ({
                url: '/user/auth/resend-otp',
                method: 'POST',
                body: data,
            }),
        }),

        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/user/auth/verify',
                method: 'POST',
                body: data,
            }),
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/user/profile',
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation, useResendOtpMutation, useVerifyOtpMutation, useUpdateProfileMutation } = usersApiSlice;
