import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";


const initialState: AuthState = {
    isAuthenticated: false,
}


const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsAuthenticated(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        }
    }
});

export const { setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;