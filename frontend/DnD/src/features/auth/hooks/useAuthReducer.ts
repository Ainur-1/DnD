import { useAppDispatch, useAppSelector } from "@/shared/redux-type-hooks";
import { setIsAuthenticated as sliceSetIsAuthenticated } from "../model/authSlice";

export function useAuthReducer() {
    const dispatch = useAppDispatch();

    const setIsAuthenticated = (isAuthenticated: boolean) => dispatch(sliceSetIsAuthenticated(isAuthenticated));
    const state = useAppSelector(state => state.auth);

    return {
        state,
        setIsAuthenticated
    };
}