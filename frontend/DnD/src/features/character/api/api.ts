import { createApi } from "@reduxjs/toolkit/query/react";
import { CarouselCharacter } from "../model/types";
import { CharacterDeathSavesQuery, CharacterDeathSavesQueryVariables, MyAliveCharactersQuery } from "@/shared/api/gql/graphql";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { client } from "@/shared/api";

export const characterApi = createApi({
    reducerPath: 'character/api',
    baseQuery: graphqlRequestBaseQuery({client}),
    tagTypes: ["MyCharactersList"],
    endpoints: (build) => ({
        /* recieve character info */
        deathSaves: build.query<CharacterDeathSavesQuery, CharacterDeathSavesQueryVariables>({
            query: (variables) => ({
                document: `query characterDeathSaves($characterId: UUID!) {
                    character(characterId: $characterId) {
                        dynamicStats {
                            deathSaves {
                                failureCount
                                successCount
                            }
                            isDying
                            isDead
                        }
                    }
                }`,
                variables
            }),
            //todo: провайд тегов
        }),
        myAliveCharacters:  build.query<MyAliveCharactersQuery, void>({
            query: (_) => ({
                documents: `query myAliveCharacters {
                    myCharacters(where: { isInParty: { eq: true } }) {
                        id
                        personality {
                            name
                            image
                        }
                    }
                }`,
            }),
            providesTags: ["MyCharactersList"]
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
                characterId
            }),
            invalidatesTags: ["MyCharactersList"]
        }),
        createCharacter: build.mutation<void, {}>({
            query: (body) => ({
                url: "createCharacter",
                method: "POST",
                body
            }),
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