import { Item } from "@/entities/item/model/types";
import { BaseHp, FullAbility, SkillModifiers } from "@/entities/character/";
import { NamePlusDescription, WithId } from "@/shared/types/domainTypes";
import { DynamicStatsDto, ProficencyWithInitiative } from "./types";
import { CharacterAlignmentType } from "@/shared/api/gql/graphql";

export type GameCharacter = {
    personality: {
        name: string;
        base64Image: string | null;
        age: number;
        race: string;
        class: string;
        alignment: CharacterAlignmentType;
        bonds: string[];
        flaws: string[];
        background: string;
        classFeatures: NamePlusDescription[];
        raceTraits: NamePlusDescription[];
        languages: string[];
        otherTraits: string[];
        level: number;
    },
    characterStats: SkillModifiers & FullAbility & BaseHp & ProficencyWithInitiative,
    dynamicStats: DynamicStatsDto;
} & WithId<string>;

export type FightInfo = {
    isFight: boolean,
    order: string[] | null
};

export type RoomState = {
    characters: GameCharacter[] 
} & FightInfo;

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
    inspiration?: number
    speed?: number,
}

export interface HealCharacterVariables {
    targetId: string;
    hpAddition?: number;
    tempHp?: number;
    usedHitDicesCount?: number;
}

export interface CharacterUpdatedEvent {
    id: string;
    stats: {
        armorClass: number;
        deathSaves: {
            failureCount: number;
            successCount: number;
        };
        hitDicesLeftCount: number;
        hp: number;
        inspiration: number;
        isDead: boolean;
        isDying: boolean;
        speed: number;
        tempHp: number;
    };
}