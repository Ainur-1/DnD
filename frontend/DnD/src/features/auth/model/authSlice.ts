import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const initialState: AuthState = {
    isAuthenticated: false,
    currentUserId: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<{userId: string} | null>) {
            const payload = action.payload;
            state.isAuthenticated = payload != null;
            state.currentUserId = payload?.userId ?? null;
        }
    }
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;