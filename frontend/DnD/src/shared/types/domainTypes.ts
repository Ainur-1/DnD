export type NamePlusDescription = {
    name: string;
    description: string;
}

export type RaceTrait = NamePlusDescription;

export type ClassFeature = NamePlusDescription;

export type Currency = "gold" | "silver" | "electrum" | "platinum" | "copper";

export type WithId<T> = {
    id: T
}
