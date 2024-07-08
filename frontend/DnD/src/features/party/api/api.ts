import { createApi } from "@reduxjs/toolkit/query/react";
import { CreatePartyMutation, CreatePartyMutationVariables, JoinPartyMutationVariables, UserPartyInfoQuery, UserPartyInfoQueryVariables } from "@/shared/api/gql/graphql";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { client } from "@/shared/api";
import { UserPartiesQuery } from "./queries/UserParties.generated";
import { JoinPartyMutation } from "./queries/JoinParty.generated";

export const partyApi = createApi({
    reducerPath: 'party/api',
    baseQuery: graphqlRequestBaseQuery({client}),
    tagTypes: ["MyParties"],
    endpoints: (build) => ({
        party: build.query<UserPartyInfoQuery, UserPartyInfoQueryVariables>({
            query: (variables) => ({
                document: `query userPartyInfo($partyId: UUID!) {
                    party(partyId: $partyId) {
                        accessCode
                        gameMasterId
                        inGameCharacterName
                        inGameCharactersIds
                    }
                }`,
                variables
            }),
        }),
        myParties: build.query<UserPartiesQuery, void>({
            query: (_) => ({
                document: `query userParties {
                    myParties {
                        accessCode
                        gameMasterId
                        id
                        inGameCharacterName
                    }
                }`,
            }),
            providesTags: ["MyParties"]
        }),

        /* mutations */
        joinParty: build.mutation<JoinPartyMutation, JoinPartyMutationVariables>({
            query: (variables) => ({
                document: `mutation joinParty($accessCode: String!, $characterId: UUID!, $partyId: UUID!) {
                        joinParty(input: { 
                            accessCode: $accessCode, 
                            characterId: $characterId, 
                            partyId: $partyId }) {
        
                                userPartyDto {
                                    id
                                }
                        }
                }`,
                variables
            }),
            invalidatesTags: ["MyParties"]
        }),
        createParty: build.mutation<CreatePartyMutation, CreatePartyMutationVariables>({
            query: (variables) => ({
                document: `mutation createParty($accessCode: String!){
                    createParty(input: { accessCode: $accessCode }) {
                        uuid
                    }
                }`,
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