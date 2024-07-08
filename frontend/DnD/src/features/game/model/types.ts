import { BaseCharacterStats, DeathSaves, DynamicStats, FullAbility, FullPersonality, SkillModifiers } from "@/entities/character/model/types";
import { WithId } from "@/shared/types/domainTypes";
import { HubConnection } from "@microsoft/signalr"

export type GameState = {
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
    otherStats: FullAbility & SkillModifiers & { proficiencyBonus: number;},
    personality: FullPersonality,
} & WithId<string>


export interface InitGameStateVariables {
    partyId: string;
    isUserGameMaster: boolean;
    deathSaves?: DeathSaves;
    userCharacterId: string | null;
}