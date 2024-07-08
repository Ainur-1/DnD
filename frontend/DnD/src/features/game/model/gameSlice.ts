import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState, InitGameStateVariables } from "./types";
import { DamageCharacterVariables, EndGameVariables,
         ItemFromInventory, RoomState, 
         SuggestItemVariables, UpdateCharacterVariables, 
         UpdateFightVariables } from "./signalRTypes";
import { Item } from "@/entities/item/model/types";
import { inventoryApi } from "@/features/inventory/api/api";
import { RootState } from "@/app/appStore";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { HUB_URL } from "@/shared/configuration/enviromentConstants";


export const damageCharacter = createAsyncThunk<void, DamageCharacterVariables, {state: GameState}>(
    'game/damageCharacter', 
    // might throw an error
    async function(args, {getState}) {
        const { characterId, damage } = args;
        const { connection } = getState();

        await connection.invoke("Damage", characterId, damage);
    }
);

function isItemFromInventory(obj: ItemFromInventory | Item): obj is ItemFromInventory {
    return 'inventoryItemId' in obj;
}

function isItem(obj: ItemFromInventory | Item): obj is Item {
    return 'weightInPounds' in obj;
}

export const suggestItem = createAsyncThunk<void, SuggestItemVariables, {state: GameState}>(
    'game/suggestItem',
    async function(args, { getState }){
        const { connection } = getState();
        const { targetCharacterId, item } = args;
        
        await connection.invoke("SuggestInventoryItem", {
            targetCharacterId: targetCharacterId,
            itemfromInventory: isItemFromInventory(item) ? item : null,
            item: isItem(item) ? item : null,
        });
    }
);

export const acceptInventoryItem = createAsyncThunk<boolean, {suggestionId: string}, {state: GameState}>(
    'game/acceptInventoryItem',
    async function(args, { getState, dispatch }){
        const { connection } = getState();
        const { suggestionId } = args;
        
        const result = await connection.invoke<boolean>("AcceptInventory", suggestionId);

        if (result) {
            dispatch(inventoryApi.util.invalidateTags(["InventoryItems"]));
        }

        return result;
    }
);

export const updateFight = createAsyncThunk<void, UpdateFightVariables, {state: GameState}>(
    'game/updateFight',
    async function(args, { getState }){
        const { connection } = getState();
        const { isFight, basicInitiativeScoreValues } = args;
        
        await connection.invoke("UpdateFight", {
            isFight: isFight,
            scoreValues: basicInitiativeScoreValues?.map(x => {
                return {
                    characterId: x.characterId,
                    score: x.score,
                };
            }),
        });
    }
);

export const updateCharacter = createAsyncThunk<void, UpdateCharacterVariables, {state: GameState}>(
    'game/updateCharacter',
    async function(args, { getState }){
        const { connection, gameInfo } = getState();
        const { userCharacterId, partyCharacters } = gameInfo;

        const character = partyCharacters.find(x => x.id == userCharacterId);
        if (character) {
            const currentStats = character.mainStats;
            await connection.invoke("UpdateCharacterStat", {
                targetCharacterId: args.targetCharacterId ?? gameInfo.userCharacterId,

                hp: args.hp ?? currentStats.hp,
                tempHp: args.tempHp ?? currentStats.tempHp,
                armorClass: args.armorClass ?? currentStats.armorClass,
                profiency: args.profiency ?? currentStats.proficiencyBonus,
                initiative: args.initiative ?? currentStats.initiativeModifier,
                inspiration: args.inspiration ?? currentStats.inspiration,
                speed: args.speed ?? currentStats.speed,
                hitDicesLeftCount: args.hitDicesLeftCount ?? currentStats.hitDicesLeftCount,
                isDead: args.isDead ?? currentStats.isDead,
                isDying: args.isDying ?? currentStats.isDying,
                deathSaves: args.deathSavesUpdate?.deathSaves ?? currentStats.deathSaves,
            });
        }
    }
);

export const endGame = createAsyncThunk<boolean, EndGameVariables, {state: GameState}>(
    "game/endGame",
    async function (args, { getState }) {
        const { connection } = getState();

        return await connection.invoke("EndGame", args.xp)
    }
)

export const initGameState = createAsyncThunk<boolean, InitGameStateVariables, { state: RootState }>(
    "game/initGameState",
    async function (args, { dispatch }) {

        const connection = new HubConnectionBuilder()
            .withUrl(HUB_URL)
            .withAutomaticReconnect()
            .build();
        
        try {
            //todo: set up connection

            await connection.start();

            const roomState = await connection.invoke<RoomState | null>("JoinRoom", args.partyId);

            if (roomState == null) {
                dispatch(setState(undefined));
                return false;
            }

            const newGameState: GameState = {
                connection: connection,
                fatalErrorOccured: false,
                gameInfo: {
                    isFighting: roomState.isFighting,
                    partyCharacters: [], // todo,
                    userCharacterId: args.userCharacterId,
                    characterStepOrder: roomState.order ?? undefined,
                    deathSaves: args.deathSaves,
                },
                isUserGameMaster: args.isUserGameMaster,
                partyId: args.partyId
            }
            dispatch(setState(newGameState));

            return true;

        } catch {
            dispatch(setState(undefined));
            return false;
        }
    }
)

const initialState: {
    state: GameState | undefined
} = {
    state: undefined
}

const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        setState(state, action: PayloadAction<GameState | undefined>) {
            state.state = action.payload;
        },
        reset(state) {
            state = initialState;
        },
        setFatalErrorOccured(st, action: PayloadAction<boolean>) {
            const state = st.state;
            if (state) {
                state.fatalErrorOccured = action.payload;
            }
        },
    },
});

export const { setState, reset, setFatalErrorOccured } = gameSlice.actions;

export default gameSlice.reducer;