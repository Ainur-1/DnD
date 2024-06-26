import { DeathSaves, MainStats, Personality } from "@/entities/character/model/types";
import { HubConnection } from "@microsoft/signalr"

export type GameState = {
    partyId: string,
    roomCode: string,
    isUserGameMaster: boolean,
    gameInfo: GameInfo
    connection: HubConnection
};

export type GameInfo = {
    userCharacterId: string,
    deathSaves?: DeathSaves
    partyCharacters: GameCharacter[],
    isFighting: boolean,
    characterStepOrder?: string[]
}

export type GameCharacter = {
    mainStats: MainStats,
    personality: Personality,
    id: string
}

export type GameStateOrNull = GameState | null;
