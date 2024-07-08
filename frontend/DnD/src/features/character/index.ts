import { useCreateCharacterMutation, useDeathSavesQuery, useLazyDeathSavesQuery, useMyCharactersQuery, useMyAliveCharactersQuery } from "./api/api";
import { CarouselCharacter } from "./model/types";
import DeleteCharacterButton from "./ui/DeleteCharacterButton";

export { useDeathSavesQuery, 
    useLazyDeathSavesQuery, 
    useMyCharactersQuery, 
    useMyAliveCharactersQuery,
    useCreateCharacterMutation,
};

export { DeleteCharacterButton };

export type { CarouselCharacter };