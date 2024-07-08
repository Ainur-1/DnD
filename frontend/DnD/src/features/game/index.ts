import { useAppDispatch, useAppSelector } from "@/shared/redux-type-hooks";
import { initGameState, reset, setFatalErrorOccured } from "./model/gameSlice";
import { InitGameStateVariables } from "./model/types";


const useGameReducer = () => {
    const dispatch = useAppDispatch();

    const state = useAppSelector(s => s.game.state);

    return {
        state,
        reset: () => dispatch(reset()),
        setFatalErrorOccured: (value: boolean) => dispatch(setFatalErrorOccured(value)),
        initGameState: (args: InitGameStateVariables) => dispatch(initGameState(args)).unwrap()
    };
}

export default useGameReducer;