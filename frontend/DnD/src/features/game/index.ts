import { useAppDispatch, useAppSelector } from "@/shared/redux-type-hooks";
import { init, reset, setFatalErrorOccured } from "./model/gameSlice";
import { GameState } from "./model/types";


const useGameReducer = () => {
    const dispatch = useAppDispatch();

    const state = useAppSelector(s => s.game.state);

    return {
        state,
        init: (state: GameState) => dispatch(init(state)),
        reset: () => dispatch(reset()),
        setFatalErrorOccured: (value: boolean) => dispatch(setFatalErrorOccured(value)),
    };
}

export default useGameReducer;