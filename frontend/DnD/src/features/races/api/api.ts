import { BASE_URL } from "@/shared/configuration/enviromentConstants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RaceNamesQueryResult } from "./variables";

export const raceApi = createApi({
    reducerPath: 'races/api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        raceNames: build.query<RaceNamesQueryResult, void>({
            query: (body) => ({
                url: "geta ll races",
                method: "POST",
                body
            }),
        }),
    })
});

export const { useRaceNamesQuery, } = raceApi;