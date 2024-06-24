import { authApi } from "@/features/auth/api/api";
import authReducer from "@/features/auth/model/authSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
})