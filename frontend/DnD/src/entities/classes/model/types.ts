import { WithId } from "@/shared/types/domainTypes";

export type ClassIdType = string;

export type SimpleClass = {
    name: string;
} & WithId<ClassIdType>;

export type ClassInfo = {
    skillTraitsMastery: string[];
    skillMasteryToChooseCount: number;
};