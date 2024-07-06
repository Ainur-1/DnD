import { BASE_URL } from "@/shared/configuration/enviromentConstants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInMutationResult, SignInMutationVariables, SignUpMutationResult, SignUpMutationVariables } from "./types";

export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        signIn: build.mutation<SignInMutationResult, SignInMutationVariables>({
            query: (body) => ({
                url: "login mutation",
                method: "POST",
                body
            }),
        }),
        signUp: build.mutation<SignUpMutationResult, SignUpMutationVariables>({
            query: (body) => ({
                url: "register mutation",
                method: "POST",
                body
            }),
        }),
        signOut: build.mutation({
            query: (_) => ({
                url: "logout mutation",
                method: "POST"
            }),
        }),
    })
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } = authApi;