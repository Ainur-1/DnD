import { Item } from "@/entities/item/model/types";
import { GameCharacter } from "./types";
import { DeathSaves } from "@/entities/character/model/types";

export interface JoinRoomVariables {
    accessCode: string,
}

export type RoomState = {
    characters: GameCharacter[] 
    isFighting: boolean,
    order: string[] | null,
};

export interface JoinRoomResult {
    success: boolean,
    payload?: RoomState
}

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
    armorClass?: number,
    profiency?: number,
    initiative?: number,
    inspiration?: number
    speed?: number,
    hitDicesLeftCount?: number,
    deathSavesUpdate?: {
        deathSaves: DeathSaves | null
    },
    isDead?: boolean,
    isDying?: boolean,
}