
export type NamePlusDescription = {
    name: string;
    description: string;
}

export type RaceTrait = NamePlusDescription;

export type ClassFeature = NamePlusDescription;

type ItemBase = {
    name: string;
    iconUrl?: string;
    weightInPounds: number;
    description?: string | null;
    costInGold: number;
    tags?: string[] | null;
}

type Stuff = ItemBase;

type Weapon = {
    damageType: string;
    attackType: string;
    proficiencyType: string;
    normalDistanceInFoots?: number | null;
    criticalDistanceInFoots?: number | null;
    properties?: string[] | null;
} & ItemBase;

type Armor = {
    armorType: string;
    material: string;
} & ItemBase

export type Item = Weapon | Armor | Stuff;

export type InventoryItem = {
    count: number;
    inUse: boolean;
    isItemProficiencyOn: boolean,
    item: Item,
}
