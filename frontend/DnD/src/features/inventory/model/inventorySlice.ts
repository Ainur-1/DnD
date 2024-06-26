import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InventoryState } from "./types";
import { ExpandedInventoryItem, InventoryItem } from "@/entities/item/model/types";
import { CharacterWallet } from "@/entities/character/model/types";

const walletInitialState = {
    cooper: 0,
    gold: 0,
    electrum: 0,
    silver: 0,
    platinum: 0,
    sumInGold: 0
}

const initialState: InventoryState = {
    characterId: null,
    items: [],
    wallet: walletInitialState,
    weight: 0
}

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialState,
    reducers: {
        resetState(state) {
            state = initialState;
        },
        setCharacterId(state, action: PayloadAction<string>) {
            state.characterId = action.payload;
        },
        setItems(state, action: PayloadAction<ExpandedInventoryItem[]>) {
            state.items = action.payload;   
        },
        setWallet(state, action: PayloadAction<CharacterWallet>) {
            state.wallet = action.payload;
        },
        setWeigth(state, action: PayloadAction<number>) {
            state.weight = action.payload;
        },
        updateItem(state, action: PayloadAction<InventoryItem>) {
            const updatedItem = action.payload;
            const indexOfItem = state.items.findIndex(x => x.id == updatedItem.id);
            if (indexOfItem != -1) {
                const expandedItemItem = state.items[indexOfItem].item;
                state.items[indexOfItem] = {
                    ...updatedItem,
                    item: expandedItemItem
                };
            }
        }
    }
});

export const { setCharacterId, setItems, setWallet, setWeigth, resetState, updateItem } = inventorySlice.actions;

export default inventorySlice.reducer;
