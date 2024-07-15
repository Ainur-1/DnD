import { createApi } from "@reduxjs/toolkit/query/react";
import { CarouselCharactersQuery, CharacterDeathSavesQuery, CharacterDeathSavesQueryVariables, CreateCharacterMutation, CreateCharacterMutationVariables, MyAliveCharactersQuery } from "@/shared/api/gql/graphql";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { client } from "@/shared/api";
import MY_ALIVE_CHARACTERS from "./queries/MyAliveCharacters.graphql";
import CHRACTER_DEATH_SAVES from "./queries/ChracterDeathSaves.graphql";
import CarouselCharacterDocument from "./queries/CarouselCharactersQuery.graphql";
import CreateCharacterDocument from "./queries/CreateCharacterMutation.graphql";

export const characterApi = createApi({
    reducerPath: 'character/api',
    baseQuery: graphqlRequestBaseQuery({client}),
    tagTypes: ["MyCharactersList"],
    endpoints: (build) => ({
        /* recieve character info */
        deathSaves: build.query<CharacterDeathSavesQuery, CharacterDeathSavesQueryVariables>({
            query: (variables) => ({
                document: CHRACTER_DEATH_SAVES,
                variables
            }),
            //todo: провайд тегов
        }),
        myAliveCharacters:  build.query<MyAliveCharactersQuery, void>({
            query: (variables) => ({
                document: MY_ALIVE_CHARACTERS,
                variables
            }),
            providesTags: ["MyCharactersList"]
        }),

        myCharacters: build.query<CarouselCharactersQuery, void>({
            query: (variables) => ({document: CarouselCharacterDocument, variables}),
            providesTags: ["MyCharactersList"],
        }),

        /* mutations */
        deleteMyCharacter: build.mutation<void, string>({
            query: (characterId) => ({
                url: "deleteCharacter",
                method: "POST",
                characterId
            }),
            invalidatesTags: ["MyCharactersList"]
        }),
        createCharacter: build.mutation<CreateCharacterMutation, CreateCharacterMutationVariables>({
            query: (variables) => ({document: CreateCharacterDocument, variables}),
            invalidatesTags: ["MyCharactersList"]
        }),
    })
});

export const { useDeathSavesQuery, 
    useLazyDeathSavesQuery, 
    useMyCharactersQuery, 
    useDeleteMyCharacterMutation,
    useMyAliveCharactersQuery,
    useCreateCharacterMutation,
} = characterApi;