import { BASE_URL } from "@/shared/configuration/enviromentConstants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreatePartyResult, CreatePartyVariables, JoinPartyResult, JoinPartyVariables, PartyQueryResult, StrictPartyQueryResult } from "./apiVariables";

export const partyApi = createApi({
    reducerPath: 'party/api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ["MyParties"],
    endpoints: (build) => ({
        strictParty: build.query<StrictPartyQueryResult, string>({
            query: (body) => ({
                url: "party query",
                method: "POST",
                body
            }),
        }),
        party: build.query<PartyQueryResult, string>({
            query: (partyId) => ({
                url: "party query",
                method: "POST",
                partyId
            }),
        }),
        myParties: build.query<PartyQueryResult[], void>({
            query: (body) => ({
                url: "my party query",
                method: "POST",
                body
            }),
            providesTags: ["MyParties"]
        }),

        joinParty: build.mutation<JoinPartyResult, JoinPartyVariables>({
            query: (body) => ({
                url: "join party",
                method: "POST",
                body
            }),
            invalidatesTags: ["MyParties"]
        }),
        createParty: build.mutation<CreatePartyResult, CreatePartyVariables>({
            query: (body) => ({
                url: "join party",
                method: "POST",
                body
            }),
            invalidatesTags: ["MyParties"]
        }),
    })
});

export const { useStrictPartyQuery, 
    useMyPartiesQuery, 
    usePartyQuery, 
    useLazyPartyQuery, 
    useJoinPartyMutation,
    useCreatePartyMutation,
} = partyApi;