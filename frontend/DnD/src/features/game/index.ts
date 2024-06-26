import { useAppDispatch, useAppSelector } from "@/shared/redux-type-hooks";
import { init, reset } from "./model/gameSlice";
import { GameState } from "./model/types";


const useGameReducer = () => {
    const dispatch = useAppDispatch();

    const state = useAppSelector(s => s.game);

    return {
        state,
        init: (state: GameState) => dispatch(init(state)),
        reset: () => dispatch(reset()),
    };
}

export default useGameReducer;