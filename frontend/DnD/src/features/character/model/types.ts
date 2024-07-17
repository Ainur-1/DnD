import { Personality } from "@/entities/character/model/types";
import { WithId } from "@/shared/types/domainTypes";

export type CarouselCharacter = Personality & WithId<string> & {
    isDead: boolean,
    canBeUpdated: boolean,
    isInParty: boolean,
}