import { BaseCharacterStats, DeathSaves, DynamicStats, FullAbility, FullPersonality, SkillModifiers } from "@/entities/character/model/types";
import { WithId } from "@/shared/types/domainTypes";
import { HubConnection } from "@microsoft/signalr"

export type GameState = {
    partyId: string,
    roomCode: string,
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
    otherStats: FullAbility & SkillModifiers & BaseCharacterStats,
    personality: FullPersonality,
} & WithId<string>

export type GameStateOrNull = GameState | null;
