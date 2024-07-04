import { useDeathSavesQuery, useDeleteMyCharacterMutation, useLazyDeathSavesQuery, useMyCharactersQuery, useOnlyCharacterNameQuery } from "./api/api";
import { CarouselCharacter } from "./model/types";

export { useDeathSavesQuery, 
    useLazyDeathSavesQuery, 
    useMyCharactersQuery, 
    useDeleteMyCharacterMutation, 
    useOnlyCharacterNameQuery 
};

export type { CarouselCharacter };