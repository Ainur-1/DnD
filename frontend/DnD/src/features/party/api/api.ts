import { createApi } from "@reduxjs/toolkit/query/react";
import { CreatePartyMutation, CreatePartyMutationVariables, JoinPartyMutationVariables, UserPartyInfoQuery, UserPartyInfoQueryVariables } from "@/shared/api/gql/graphql";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { client } from "@/shared/api";
import { UserPartiesQuery } from "./queries/UserParties.generated";
import { JoinPartyMutation } from "./queries/JoinParty.generated";
import UserPartyInfoDocument from "./queries/UserPartyInfo.graphql";
import UserPartiesDocument from "./queries/UserParties.graphql";
import JoinPartyDocument from "./queries/JoinParty.graphql";
import CreatePartyDocument from "./queries/CreateParty.graphql";

export const partyApi = createApi({
    reducerPath: 'party/api',
    baseQuery: graphqlRequestBaseQuery({client}),
    tagTypes: ["MyParties"],
    endpoints: (build) => ({
        party: build.query<UserPartyInfoQuery, UserPartyInfoQueryVariables>({
            query: (variables) => ({
                document: UserPartyInfoDocument,
                variables
            }),
        }),
        myParties: build.query<UserPartiesQuery, void>({
            query: (variables) => ({
                document: UserPartiesDocument,
                variables
            }),
            providesTags: ["MyParties"]
        }),

        /* mutations */
        joinParty: build.mutation<JoinPartyMutation, JoinPartyMutationVariables>({
            query: (variables) => ({
                document: JoinPartyDocument,
                variables
            }),
            invalidatesTags: ["MyParties"]
        }),
        createParty: build.mutation<CreatePartyMutation, CreatePartyMutationVariables>({
            query: (variables) => ({
                document: CreatePartyDocument,
                variables
            }),
            invalidatesTags: ["MyParties"]
        }),
    })
});

export const {
    useMyPartiesQuery, 
    usePartyQuery, 
    useLazyPartyQuery, 
    useJoinPartyMutation,
    useCreatePartyMutation,
} = partyApi;