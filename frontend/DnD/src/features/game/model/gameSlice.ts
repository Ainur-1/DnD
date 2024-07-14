import { createAsyncThunk, createSlice, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { DynamicStatsDto, GameCharacter, GameState, InitGameStateVariables } from "./types";
import { CharacterUpdatedEvent, DamageCharacterVariables, EndGameVariables,
         FightInfo,
         ItemFromInventory, RoomState, 
         SuggestItemVariables, UpdateCharacterVariables, 
         UpdateFightVariables } from "./signalRTypes";
import { Item } from "@/entities/item/model/types";
import { inventoryApi } from "@/features/inventory/api/api";
import { RootState } from "@/app/appStore";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { HUB_URL } from "@/shared/configuration/enviromentConstants";
import { mapDtoToGameCharacter } from "./mapDtoToGameCharter";
import { GameCharacter as GameCharacterDto } from "./signalRTypes";
import { WithId } from "@/shared/types/domainTypes";


export const damageCharacter = createAsyncThunk<void, DamageCharacterVariables, {state: RootState}>(
    'game/damageCharacter', 
    async function(args, {getState, dispatch}) {
        const { characterId, damage } = args;
        const { state } = getState().game;
        if (!state) {
            return;
        }

        const { connection } = state;
        try {
            await connection.invoke("Damage", characterId, damage);
        } catch {
            dispatch(setFatalErrorOccured(true));
        }
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

export const updateFight = createAsyncThunk<void, UpdateFightVariables, {state: RootState}>(
    'game/updateFight',
    async function(args, { getState, dispatch }){
        const { state } = getState().game;
        if (!state) {
            return;
        }
        const { connection } = state;
        const { isFight, basicInitiativeScoreValues } = args;
        try {
            await connection.invoke("UpdateFight", {
                isFight: isFight,
                scoreValues: basicInitiativeScoreValues?.map(x => {
                    return {
                        characterId: x.characterId,
                        score: x.score,
                    };
                }),
            });
        } catch {
            dispatch(setFatalErrorOccured(true));
        }
    }
);

export const updateCharacter = createAsyncThunk<void, UpdateCharacterVariables, {state: RootState}>(
    'game/updateCharacter',
    async function(args, { getState, dispatch }){
        const { state } = getState().game;
        if (!state) {
            return;
        }
        const { connection, gameInfo } = state;
        const { userCharacterId, partyCharacters } = gameInfo;
        try {
            const character = partyCharacters.find(x => x.id == userCharacterId);
            if (character) {
                const currentStats = character.mainStats;
                await connection.invoke("UpdateCharacterStat", {
                    targetCharacterId: args.targetCharacterId ?? gameInfo.userCharacterId,
    
                    hp: args.hp ?? currentStats.hp,
                    tempHp: args.tempHp ?? currentStats.tempHp,
                    inspiration: args.inspiration ?? currentStats.inspiration,
                    speed: args.speed ?? currentStats.speed,
                    hitDicesLeftCount: args.hitDicesLeftCount ?? currentStats.hitDicesLeftCount,
                    isDead: args.isDead ?? currentStats.isDead,
                    isDying: args.isDying ?? currentStats.isDying,
                    deathSaves: args.deathSavesUpdate?.deathSaves ?? gameInfo.deathSaves
                });
            }
        } catch{
            dispatch(setFatalErrorOccured(true));
        }
    }
);

export const endGame = createAsyncThunk<boolean, EndGameVariables, {state: RootState}>(
    "game/endGame",
    async function (args, { getState, dispatch }) {
        const  { state }  = getState().game;
        if (!state) {
            return false;
        }
        const { connection } = state;
        try {
            const result = await connection.invoke("EndGame", args.xp);
            return result;
        } catch {
            dispatch(setFatalErrorOccured(true));
            return false;
        }
    }
)

export const initGameState = createAsyncThunk<boolean, InitGameStateVariables, { state: RootState }>(
    "game/initGameState",
    async function (args, { dispatch }) {

        const connection = new HubConnectionBuilder()
            .withUrl(HUB_URL)
            .withAutomaticReconnect()
            .build();
        
        connection.on("OnFightUpdate", (args: FightInfo) => dispatch(setFight(args)));
        connection.on("OnPartyDisband", () => dispatch(setGameEnd(true)));
        connection.on("OnPartyJoin", (args: GameCharacterDto) => dispatch(addGameChracter(mapDtoToGameCharacter(args))));
        connection.on("OnCharacterUpdate", (args: CharacterUpdatedEvent) => dispatch(updateCharacterDynamicStats({
            ...args.stats,
            id: args.id,
        })));

        try {
            const roomState = await connection.start()
                .then(() => connection.invoke<RoomState | null>("JoinRoom", args.partyId));

            if (roomState == null) {
                dispatch(setState(undefined));
                return false;
            }

            const newGameState: GameState = {
                connection: connection,
                fatalErrorOccured: false,
                isGameEnd: false,
                gameInfo: {
                    isFighting: roomState.isFight,
                    partyCharacters: roomState.characters
                        .map(x => mapDtoToGameCharacter(x)),
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
        setFight(state, action: PayloadAction<FightInfo>) {
            if (!state) {
                return;
            }

            const game = state.state;
            if (!game || game.fatalErrorOccured) {
                return;
            }

            game.gameInfo.isFighting = action.payload.isFight;
            game.gameInfo.characterStepOrder = action.payload.order ?? undefined;
        },
        setGameEnd(state, action: PayloadAction<boolean>) {
            if (!state || !state.state) {
                return;
            }

            state.state.isGameEnd = action.payload;
        },
        addGameChracter(state, action: PayloadAction<GameCharacter>) {
            if (!state || !state.state) {
                return;
            }

            const { gameInfo } = state.state;
            if(!gameInfo.partyCharacters.find(x => x.id == action.payload.id)) {
                gameInfo.partyCharacters.push(action.payload);
            }
        },
        updateCharacterDynamicStats(state, action: PayloadAction<DynamicStatsDto & WithId<string>>) {
            const { payload } = action;

            if (!state || !state.state) {
                return;
            }

            const { partyCharacters } = state.state.gameInfo;
            const character = partyCharacters.find(x => x.id == payload.id);
            if (!character) {
                return;
            }

            const { mainStats } = character;
            mainStats.armorClass = payload.armorClass;
            mainStats.hitDicesLeftCount = payload.hitDicesLeftCount;
            mainStats.hp = payload.hp;
            mainStats.inspiration = payload.inspiration;
            mainStats.isDying = payload.isDying;
            mainStats.isDead = payload.isDead;
            mainStats.speed = payload.speed;
            mainStats.tempHp = payload.tempHp;
        }
    },
});

export const { setState, reset, setFatalErrorOccured, setFight, setGameEnd, addGameChracter, updateCharacterDynamicStats } = gameSlice.actions;

export default gameSlice.reducer;