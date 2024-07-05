import { BASE_URL } from "@/shared/configuration/enviromentConstants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RaceNamesInfoQueryResult, RaceNamesQueryResult } from "./variables";

export const raceApi = createApi({
    reducerPath: 'races/api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        strictRaces: build.query<RaceNamesQueryResult, void>({
            query: (body) => ({
                url: "geta ll races",
                method: "POST",
                body
            }),
        }),
        raceInfo: build.query<RaceNamesInfoQueryResult, string>({
            query: (body) => ({
                url: "get full race info",
                method: "POST",
                body
            }),
        }),
    })
});

export const { 
    useStrictRacesQuery, 
    useRaceInfoQuery, 
    useLazyRaceInfoQuery 
} = raceApi;