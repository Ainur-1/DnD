
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
    id: string,
    count: number;
    inUse: boolean;
    isItemProficiencyOn: boolean;
}

export type ExpandedInventoryItem = InventoryItem & {
    item: Item,
}