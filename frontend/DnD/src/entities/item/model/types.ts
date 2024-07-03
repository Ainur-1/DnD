
export type ItemBase = {
    name: string;
    iconUrl?: string;
    weightInPounds: number;
    description?: string;
    costInGold: number;
    tags?: string[];
}

type Stuff = ItemBase;

export enum WeaponDamageType {
    ranged = "Ranged",
    melee = "Melee",
}

export enum WeaponAttackType
{
    piercing = "Piercing",
    bludgeoning= "Bludgeoning",
    slashing = "Slashing",
}

export enum WeaponProficiencyType
{
    simple = "Simple",
    martial = "Martial",
}

export enum WeaponProperty
{
    ammunition = "Ammunition",
    finesse = "Finesse",
    loading = "Loading",
    range = "Range",
    reach = "Reach",
    special = "Special",
    thrown = "Thrown",
    light = "Light",
    heavy = "Heavy",
    versatile = "Versatile",
    twoHanded = "TwoHanded",
}

type Weapon = {
    attackType: WeaponAttackType;
    proficiencyType: WeaponProficiencyType;

    damageType: WeaponDamageType;
    normalDistanceInFoots?: number;
    criticalDistanceInFoots?: number;

    properties?: WeaponProperty[];
    hitDice: string;
    alternateHitDice?: string;
} & ItemBase;

export enum ArmorType {
    light,
    medium,
    heavy,
    shield
}

type Armor = {
    armorType: ArmorType;
    material: string;
    requiredStrength?: number
    hasStealthDisadvantage: boolean,
    maxPossibleDexterityModifier?: number,
    armorClass: number,
    
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