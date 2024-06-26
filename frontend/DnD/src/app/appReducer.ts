import { authApi } from "@/features/auth/api/api";
import authReducer from "@/features/auth/model/authSlice";
import inventoryReducer from "@/features/inventory/model/inventorySlice";
import { inventoryApi } from "@/features/inventory/api/api";

import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    inventory: inventoryReducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
})