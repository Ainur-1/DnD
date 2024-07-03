import { BASE_URL } from "@/shared/configuration/enviromentConstants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DeathSavesResult } from "./variables";

export const characterApi = createApi({
    reducerPath: 'character/api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        deathSaves: build.query<DeathSavesResult, string>({
            query: (body) => ({
                url: "character deathsaves",
                method: "POST",
                body
            }),
        }),
    })
});

export const { useDeathSavesQuery, useLazyDeathSavesQuery, } = characterApi;