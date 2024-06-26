import { authApi } from "@/features/auth/api/api";
import authReducer from "@/features/auth/model/authSlice";
import gameReducer from "@/features/game/model/gameSlice";
import { inventoryApi } from "@/features/inventory/api/api";

import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    game: gameReducer,
})