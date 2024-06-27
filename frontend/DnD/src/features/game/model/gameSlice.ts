import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "./types";

const initialState: GameState


const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        init(state, action: PayloadAction<GameState>) {
            state = action.payload;


        },
        reset(state) {
            state = initialState;
        }
        
    }
});

export const { init, reset } = gameSlice.actions;

export default gameSlice.reducer;