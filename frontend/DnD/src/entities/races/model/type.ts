import { NamePlusDescription, WithId } from "@/shared/types/domainTypes";

export type RaceIdType = string;

export type SimpleRace = {
    name: string,
} & WithId<RaceIdType>;

export type RaceInfo = {
    adultAge: number;
    recommendedAlignmentDescription: string;
    size: string;
    speed: number;
    languages: string[];
    subraces: string[];
    raceTraits: RaceTrait[];
} & SimpleRace;

export type Race = {
    subrace?: string;
} & SimpleRace

export type RaceTrait = {
    options?: string[] | null
} & NamePlusDescription;
