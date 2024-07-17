import {  DeathSaves, DynamicStats, FullAbility, FullPersonality, SkillModifiers } from "@/entities/character/model/types";
import { WithId } from "@/shared/types/domainTypes";
import { HubConnection } from "@microsoft/signalr"

export type ProficencyWithInitiative = {
    proficiencyBonus: number; 
    initiativeModifier: number
}

export type GameState = {
    isGameEnd:boolean,
    partyId: string,
    isUserGameMaster: boolean,
    gameInfo: GameInfo,
    connection: HubConnection,
    fatalErrorOccured: boolean,
};

export type GameInfo = {
    userCharacterId: string | null,
    deathSaves?: DeathSaves
    partyCharacters: GameCharacter[],
    isFighting: boolean,
    characterStepOrder?: string[]
}

export type GameCharacter = {
    mainStats: DynamicStats,
    otherStats: FullAbility & SkillModifiers & ProficencyWithInitiative & {maxHp: number;},
    personality: FullPersonality,
} & WithId<string>

export interface InitGameStateVariables {
    partyId: string;
    isUserGameMaster: boolean;
    deathSaves?: DeathSaves;
    userCharacterId: string | null;
}

export interface DynamicStatsDto {
    hp: number;
    tempHp: number;
    armorClass: number;
    inspiration: number; 
    speed: number;
    hitDicesLeftCount:number;
    isDead: boolean; 
    isDying: boolean;
    deathSaves: DeathSaves | null;
}
