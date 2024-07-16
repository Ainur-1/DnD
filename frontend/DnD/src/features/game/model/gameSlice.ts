import { createAsyncThunk, createSlice, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { DynamicStatsDto, GameCharacter, GameState, InitGameStateVariables } from "./types";
import { CharacterUpdatedEvent, DamageCharacterVariables, EndGameVariables,
         FightInfo,
         HealCharacterVariables,
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
import { DeathSaves } from "@/entities/character";
import { DeathSavesDto } from "@/shared/api/gql/graphql";


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

export const healCharacter = createAsyncThunk<void, HealCharacterVariables, {state: RootState}>(
    'game/healCharacter',
    async function (args, {getState, dispatch}) {
        const {state} = getState().game;
        if (!state) {
            return;
        }
        const { connection } = state;

        try {
            await connection.invoke("Heal", args.targetId, {
                hpAddition: args.hpAddition ?? null,
                tempHp : args.tempHp ?? null,
                usedHitDicesCount: args.usedHitDicesCount ?? null
            });
        } catch{
            dispatch(setFatalErrorOccured(true));
        }
    }
);

export const updateDeathSaves = createAsyncThunk<void, DeathSavesDto, {state: RootState}>(
    'game/updateDeathSaves',
    async function (args, {getState, dispatch}) {
        const {state} = getState().game;
        if (!state) {
            return;
        }
        const { connection } = state;

        try {
            await connection.invoke("UpdateDeathSaves", args);
        } catch{
            dispatch(setFatalErrorOccured(true));
        }
    }
);

export const resurrect = createAsyncThunk<void, {targetId?: string}, {state: RootState}>(
    'game/resurrect',
    async function (args, {getState, dispatch}) {
        const {state} = getState().game;
        if (!state) {
            return;
        }
        const { connection, isUserGameMaster, gameInfo } = state;
        const targetId = isUserGameMaster ? args.targetId! : gameInfo.userCharacterId; 
        try {
            await connection.invoke("Resurrect", targetId);
        } catch{
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
        const { connection, gameInfo, isUserGameMaster } = state;
        const { userCharacterId } = gameInfo;
        try {
            const searchId = isUserGameMaster ? args.targetCharacterId! : userCharacterId; 
            await connection.invoke("UpdateCharacterStat", 
                searchId,
                {    
                    speed: args.speed,
                    inspiration: args.inspiration,
                });
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

function onCharacterUpdate(args: CharacterUpdatedEvent, dispatch: any) {
    const { id, stats } = args;
    dispatch(updateCharacterDynamicStats({
        armorClass: stats.armorClass,
        hitDicesLeftCount: stats.hitDicesLeftCount,
        hp: stats.hp,
        inspiration: stats.inspiration,
        isDead: stats.isDead,
        isDying: stats.isDying,
        speed: stats.speed,
        tempHp: stats.tempHp,
        deathSaves: stats.deathSaves,
        id: id,
    }));
}

function onFightUpdate(args: {
    isFight: boolean;
    scoreValues: {
            characterId: string;
            score: number;
        }[] | null | undefined
    }, 
    dispatch: any) {
    const { isFight, scoreValues } = args;

    dispatch(setFight({
        isFight: isFight,
        order: scoreValues?.map(x => x.characterId) ?? null
    }));
}

export const initGameState = createAsyncThunk<boolean, InitGameStateVariables, { state: RootState }>(
    "game/initGameState",
    async function (args, { dispatch }) {

        const connection = new HubConnectionBuilder()
            .withUrl(HUB_URL)
            .withAutomaticReconnect()
            .build();
        
        connection.on("OnFightUpdate", (args) => onFightUpdate(args, dispatch));
        connection.on("OnPartyDisband", () => dispatch(setGameEnd(true)));
        connection.on("OnPartyJoin", (args: GameCharacterDto) => dispatch(addGameChracter(mapDtoToGameCharacter(args))));
        connection.on("OnCharacterUpdate", (args) => onCharacterUpdate(args, dispatch));

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

            let deathSaves: DeathSaves | undefined;
            if (payload.deathSaves && payload.isDying) {
                deathSaves = {
                    failureCount: payload.deathSaves!.failureCount,
                    successCount: payload.deathSaves!.successCount
                }
            } else {
                deathSaves = undefined;
            }

            state.state.gameInfo.deathSaves = deathSaves;
        }
    },
});

export const { setState, reset, setFatalErrorOccured, setFight, setGameEnd, addGameChracter, updateCharacterDynamicStats } = gameSlice.actions;

export default gameSlice.reducer;