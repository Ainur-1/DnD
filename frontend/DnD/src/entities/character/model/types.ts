import { ClassFeature, RaceTrait } from "@/shared/types/domainTypes"

export type Personality = {
    characterName: string | "",
    characterRace: string,
    characterClass: string,
    characterLevel: number,
    characterImageBase64?: string | null,
}

export type PersonalityAdditions = {
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

export type FullPersonality = Personality & PersonalityAdditions;

export type Abilities = {
    strengthAbility: number;
    dexterityAbility: number;
    constitutionAbility: number;
    intelligenceAbility: number;
    wisdomAbility: number;
    charismaAbility: number;
} 

export type AbilityModifiers = {
    strengthModifier: number;
    dexterityModifier: number;
    constitutionModifier: number;
    intelligenceModifier: number;
    wisdomModifier: number;
    charismaModifier: number;
}

export type FullAbility = Abilities & AbilityModifiers;

export type SkillModifiers = {
    acrobaticsModifier: number;
    investigationModifier: number;
    athleticsModifier: number;
    perceptionModifier: number;
    survivalModifier: number;
    performanceModifier: number;
    persuasionModifier: number;
    historyModifier: number;
    handSleightModifier: number;
    arcanaModifier: number;
    medicineModifier: number;
    deceptionModifier: number;
    natureModifier: number;
    insightModifier: number;
    religionModifier: number;
    stealthModifier: number;
    intimidationModifier: number;
    animalHandingModifier: number;
}

export type SavingThrowsModifiers = {
    strengthSavingThrowModifier: number;
    dexteritySavingThrowModifier: number;
    constitutionSavingThrowModifier: number;
    intelligenceSavingThrowModifier: number;
    wisdomSavingThrowModifier: number;
    charismaSavingThrowModifier: number;
}

export type DeathSaves = {
    successCount: number,
    failureCount: number
}

export type BaseCharacterStats = {
    maxHp: number,
    baseArmor: number,
    baseSpeed: number,
    hpDice: string,
    hpDiceMaxCount: number,
    proficiencyBonus: number,
}

type DynamicHp = {
    hp: number,
    tempHp: number,

}

export type ProficiencyAndInitiative = {
    initiativeModifier: number,
    proficiencyBonus: number,
}


export type DynamicStats = {
    hp: number,
    tempHp: number,
    armorClass: number,
    inspiration: number,
    speed: number,
    hitDicesLeftCount: number,
    isDead: boolean,
    isDying: boolean,
    deathSaves: DeathSaves | null
} & ProficiencyAndInitiative;

export type HitDices = {
    hitDice: string,
    hitDiceLeft: number,
}
