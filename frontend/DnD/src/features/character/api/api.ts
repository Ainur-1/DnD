import { BASE_URL } from "@/shared/configuration/enviromentConstants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DeathSavesResult } from "./variables";
import { CarouselCharacter } from "../model/types";

export const characterApi = createApi({
    reducerPath: 'character/api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ["MyCharactersList"],
    endpoints: (build) => ({
        /* recieve character info */
        deathSaves: build.query<DeathSavesResult, string>({
            query: (body) => ({
                url: "character deathsaves",
                method: "POST",
                body
            }),
            //todo: провайд тегов
        }),
        onlyCharacterName:  build.query<string, string>({
            query: (body) => ({
                url: "character name",
                method: "POST",
                body
            }),
            //todo: провайд тегов
        }),

        /* mutations */
        myCharacters: build.query<CarouselCharacter[], void>({
            query: () => ({
                url: "my characters list",
                method: "POST",
            }),
            providesTags: ["MyCharactersList"],
        }),
        deleteMyCharacter: build.mutation<void, string>({
            query: (characterId) => ({
                url: "deleteCharacter",
                method: "POST",
            }),
            invalidatesTags: ["MyCharactersList"]
        }),
    })
});

export const { useDeathSavesQuery, 
    useLazyDeathSavesQuery, 
    useMyCharactersQuery, 
    useDeleteMyCharacterMutation,
    useOnlyCharacterNameQuery,
    useLazyOnlyCharacterNameQuery
} = characterApi;