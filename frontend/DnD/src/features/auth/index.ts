import { useAppDispatch, useAppSelector } from "@/shared/redux-type-hooks";
import { useSignInMutation, useSignOutMutation, useSignUpMutation } from "./api/api";
import { setUser } from "./model/authSlice";


function useAuthReducer() {
    const dispatch = useAppDispatch();

    const state = useAppSelector(state => state.auth);

    return {
        state,
        setUser: (user: {userId: string} | null) => dispatch(setUser(user)),
    };
}



export {useAuthReducer, useSignInMutation, useSignOutMutation, useSignUpMutation };