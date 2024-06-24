import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./appReducer";
import { authApi } from "@/features/auth/api/api";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;