import { ClassFeature, InventoryItem, RaceTrait } from "@/shared/types/domainTypes"

export type CharacterInfoBase = {
    characterName: string | "",
    characterRace: string,
    characterClass: string,
    characterLevel: number,
    characterImageBase64?: string | null,
}

export type CharacterPersonalityAdditions = {
    age: number,
    aligment: string,
    bonds: string[],
    flaws: string[],
    background: string,
    classFeatures: ClassFeature[],
    raceTraits: RaceTrait[],
    otherTraits: string[],
    languages: string[],
}

export type BaseCharacterModifiers = {
    proficiencyBonus: number;
    strengthAbility: number;
    dexterityAbility: number;
    constitutionAbility: number;
    intelligenceAbility: number;
    wisdomAbility: number;
    charismaAbility: number;
    strengthModifier: number;
    dexterityModifier: number;
    constitutionModifier: number;
    intelligenceModifier: number;
    wisdomModifier: number;
    charismaModifier: number;
    acrobaticsSkillModifier: number;
    investigationSkillModifier: number;
    athleticsSkillModifier: number;
    perceptionSkillModifier: number;
    survivalSkillModifier: number;
    performanceSkillModifier: number;
    persuasionSkillModifier: number;
    historySkillModifier: number;
    handSleightSkillModifier: number;
    arcanaSkillModifier: number;
    medicineSkillModifier: number;
    deceptionSkillModifier: number;
    natureSkillModifier: number;
    insightSkillModifier: number;
    religionSkillModifier: number;
    stealthSkillModifier: number;
    intimidationSkillModifier: number;
    animalHandingSkillModifier: number;
    strengthSavingThrowModifier: number;
    dexteritySavingThrowModifier: number;
    constitutionSavingThrowModifier: number;
    intelligenceSavingThrowModifier: number;
    wisdomSavingThrowModifier: number;
    charismaSavingThrowModifier: number;
}

export type BaseCharacterStats = {
    maxHp: number,
    baseArmor: number,
    hpDice: string,
    baseSpeed: number,
    hpDiceMaxCount: number,
}

export type CharacterSavingThrows = {
    successCount: number,
    failureCount: number
}

type DynamicHp = {
    hp: number,
    tempHp: number,
    hitDicesLeft: number,
}

export type DynamicStats = {
    speed: number,
    initiativeModifier: number,
    inspirationBonus: number,
    armor: number,
} & DynamicHp & CharacterSavingThrows;

export type CharacterWallet = {
    cooper: number,
    gold: number,
    electrum: number,
    silver: number,
    platinum: number,
    sumInGold: number
}

export type CharacterInventory = {
    weight: number,
    wallet: CharacterWallet,
    items: InventoryItem[]
}

