export type NamePlusDescription = {
    name: string;
    description: string;
}

export type RaceTrait = NamePlusDescription;

export type ClassFeature = NamePlusDescription;

export enum Dice {
    oneD1 = "1d1",
    oneD2 = "1d2",
    oneD3 = "1d3",
    oneD4 = "1d4",
    oneD6 = "1d6",
    oneD8 = "1d8",
    oneD10 = "1d10",
    oneD12 = "1d12",
    twoD6 = "2d6",
    twoD10 = "2d10"
}

export type WithId<T> = {
    id: T
}

export enum Aligments {
    lawfulGood = "LawfulGood",
    neutralGood = "NeutralGood",
    chaoticGood = "ChaoticGood",
    lawfulNeutral = "LawfulNeutral",
    trueNeutral = "TrueNeutral",
    chaoticNeutral = "ChaoticNeutral",
    lawfulEvil = "LawfulEvil",
    neutralEvil = "NeutralEvil",
    chaoticEvil = "ChaoticEvil",
    unaligned = "Unaligned",
    any = "Any",
}