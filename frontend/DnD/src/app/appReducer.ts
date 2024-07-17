import { authApi } from "@/features/auth/api/api";
import authReducer from "@/features/auth/model/authSlice";
import { characterApi } from "@/features/character/api/api";
import { classApi } from "@/features/classes/api/api";
import gameReducer from "@/features/game/model/gameSlice";
import { inventoryApi } from "@/features/inventory/api/api";
import { partyApi } from "@/features/party/api/api";
import { raceApi } from "@/features/races/api/api";

import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    game: gameReducer,
    [partyApi.reducerPath]: partyApi.reducer,
    [characterApi.reducerPath]: characterApi.reducer,
    [raceApi.reducerPath]: raceApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
})