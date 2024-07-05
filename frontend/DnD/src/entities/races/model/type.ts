import { WithId } from "@/shared/types/domainTypes";

export type RaceIdType = string;

export type SimpleRace = {
    name: string,
} & WithId<RaceIdType>;

export type RaceInfo = {
    subrace: string;
    adultAge: number;
    recommendedAlignmentDescription: string;
    size: string;
    speed: number;
    languages: string[];
    subraces: string[];

} & SimpleRace;

export type Race = {
    subrace?: string;
} & SimpleRace