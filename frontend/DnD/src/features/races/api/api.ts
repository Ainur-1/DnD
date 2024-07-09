import { createApi } from "@reduxjs/toolkit/query/react";
import { GetRaceQueryVariables, GetRacesQuery, GetRaceQuery } from "@/shared/api/gql/graphql";
import GetRacesDocument from "./queries/GetRaces.graphql";
import GetRaceDocument from "./queries/GetRace.graphql";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { client } from "@/shared/api";

export const raceApi = createApi({
    reducerPath: 'races/api',
    baseQuery: graphqlRequestBaseQuery({client: client}),
    endpoints: (build) => ({
        strictRaces: build.query<GetRacesQuery, void>({
            query: (variables) => ({document: GetRacesDocument, variables}),
        }),
        raceInfo: build.query<GetRaceQuery, GetRaceQueryVariables>({
            query: (variables) => ({document: GetRaceDocument, variables})
        }),
    })
});

export const { 
    useStrictRacesQuery, 
    useRaceInfoQuery, 
    useLazyRaceInfoQuery 
} = raceApi;