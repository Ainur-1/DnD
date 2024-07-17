import { createApi,  } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { client } from "@/shared/api";
import { SignInInput, SignInMutation, SignOutMutation, SignUpInput, SignUpMutation } from "@/shared/api/gql/graphql";
import signInDocumnet from './queries/SignIn.graphql';
import signUpDocumnet from './queries/SignUp.graphql';
import signOutDocumnet from './queries/SignOut.graphql';

export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery:  graphqlRequestBaseQuery({client}),
    endpoints: (build) => ({
        signIn: build.mutation<SignInMutation, SignInInput>({
            query: (variables) => ({
                document: signInDocumnet, 
                variables,
            })
        }),
        signUp: build.mutation<SignUpMutation, SignUpInput>({
            query: (variables) => ({
                document: signUpDocumnet,
                variables
            }),
        }),
        signOut: build.mutation<SignOutMutation, void>({
            query: (variables) => ({
                document: signOutDocumnet,
                variables}),
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } = authApi;