import { Item } from "@/entities/item/model/types";
import { BaseHp, DeathSaves, FullAbility, SkillModifiers } from "@/entities/character/";
import { Aligments, NamePlusDescription, WithId } from "@/shared/types/domainTypes";

export type GameCharacter = {
    personality: {
        name: string;
        base64Image: string | null;
        age: number;
        race: string;
        class: string;
        alignment: Aligments;
        bonds: string[];
        flaws: string[];
        background: string;
        classFeatures: NamePlusDescription[];
        raceTraits: NamePlusDescription[];
        languages: string[];
        otherTraits: string[];
        level: number;
    },
    characterStats: SkillModifiers & FullAbility & BaseHp,
    dynamicStats: {
        hp: number;
        tempHp: number;
        armorClass: number;
        proficiency: number;
        initiative: number;
        inspiration: number;
        speed: number;
        hitDicesLeftCount: number;
        isDead: boolean;
        isDying: boolean;
        deathSaves: DeathSaves | null;
    }
} & WithId<string>;

export type RoomState = {
    characters: GameCharacter[] 
    isFight: boolean,
    order: string[] | null,
};

export interface DamageCharacterVariables {
    characterId: string,
    damage: number,
}

export interface ItemFromInventory {
    inventoryItemId: string,
    count: number,
}

export interface SuggestItemVariables {
    targetCharacterId: string,
    item: ItemFromInventory | Item,
}

export interface UpdateFightVariables {
    isFight: boolean,
    basicInitiativeScoreValues: {
        characterId: string,
        score: number
    }[] | null
};

export interface EndGameVariables {
    xp: number,
}

export interface UpdateCharacterVariables {
    targetCharacterId: string | null,
    hp?: number,
    tempHp?: number,
    inspiration?: number
    speed?: number,
    hitDicesLeftCount?: number,
    deathSavesUpdate?: {
        deathSaves: DeathSaves | null
    },
    isDead?: boolean,
    isDying?: boolean,
}