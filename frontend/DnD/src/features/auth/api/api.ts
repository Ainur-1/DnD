import { createApi,  } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { client } from "@/shared/api";
import { SignInInput, SignInMutation, SignUpInput, SignUpMutation } from "@/shared/api/gql/graphql";
import { SignOutMutation } from "./queries/SignOut.generated";

export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery:  graphqlRequestBaseQuery({client}),
    endpoints: (build) => ({
        signIn: build.mutation<SignInMutation, SignInInput>({
            query: (variables) => ({
                document: `
                    mutation signIn($login: String!, $password: String!,$rememberMe:Boolean!) {
                        signIn(input: { login: $login, password: $password, rememberMe: $rememberMe}) {
                            uuid
                        }
                }`, 
                variables,
            })
        }),
        signUp: build.mutation<SignUpMutation, SignUpInput>({
            query: (variables) => ({
                document:`mutation signUp($email: String!, $name: String, $password: String!, $username: String!) {
                signUp(input: { email: $email, name: $name, password: $password, username: $username }) {
                boolean
                errors {
                    ... on FieldNameTakenError { message }
                    ... on InvalidArgumentValueError { message }
                    }
                }
                }`,
                variables
            }),
        }),
        signOut: build.mutation<SignOutMutation, void>({
            query: (variables) => ({
                document: `mutation signOut { signOut { boolean } }`,
                variables}),
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } = authApi;