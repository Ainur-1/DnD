import { BASE_URL } from "@/shared/configuration/enviromentConstants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyPartiesQueryResult, PartyQueryResult, StrictPartyQueryResult } from "./apiVariables";

export const partyApi = createApi({
    reducerPath: 'party/api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
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
            }),
        }),
        myParties: build.query<MyPartiesQueryResult, void>({
            query: (body) => ({
                url: "my party query",
                method: "POST",
                body
            }),
        }),
    })
});

export const { useStrictPartyQuery, useMyPartiesQuery, usePartyQuery, useLazyPartyQuery } = partyApi;