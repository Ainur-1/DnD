
export type NamePlusDescription = {
    name: string;
    description: string;
}

export type RaceTrait = NamePlusDescription;

export type ClassFeature = NamePlusDescription;


export enum Dice {
    "1d1",
    "1d2",
    "1d3",
    "1d4",
    "1d6",
    "1d8",
    "1d10",
    "1d12",
    "2d6",
    "2d10"
}
