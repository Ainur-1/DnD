import { ArmorType, Dice, WeaponAttackType, WeaponDamageType, WeaponProficiencyType, WeaponProperty } from "@/shared/api/gql/graphql";
import { WithId } from "@/shared/types/domainTypes";

export type ItemBase = {
    name: string;
    iconUrl?: string;
    weightInPounds: number;
    description?: string;
    costInGold: number;
    tags?: string[];
}

export type Stuff = ItemBase;


export type Weapon = {
    attackType: WeaponAttackType;
    proficiencyType: WeaponProficiencyType;

    damageType: WeaponDamageType;
    normalDistanceInFoots?: number;
    criticalDistanceInFoots?: number;

    properties?: WeaponProperty[];
    hitDice: Dice;
    alternateHitDice?: Dice;
} & ItemBase;

export type Armor = {
    armorType: ArmorType;
    material: string;
    requiredStrength?: number
    hasStealthDisadvantage: boolean,
    maxPossibleDexterityModifier?: number,
    armorClass: number,
    
} & ItemBase

export type Item = Weapon | Armor | Stuff;

export type InventoryItem = {
    count: number;
    inUse: boolean;
    isItemProficiencyOn: boolean;
} & WithId<string>;

export type ExpandedInventoryItem = InventoryItem & {
    item: Item,
}

export type InventoryWallet = {
    goldCoins: number;
    copperCoins: number;
    platinumCoins: number;
    silverCoins: number;
    electrumCoins: number;
    totalInGoldCoins: number;
}