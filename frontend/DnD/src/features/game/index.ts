import { useAppDispatch, useAppSelector } from "@/shared/redux-type-hooks";
import { damageCharacter, endGame, initGameState, reset, setFatalErrorOccured, updateCharacter } from "./model/gameSlice";
import { InitGameStateVariables } from "./model/types";
import { UpdateCharacterVariables } from "./model/signalRTypes";


const useGameReducer = () => {
    const dispatch = useAppDispatch();

    const state = useAppSelector(s => s.game.state);

    return {
        state,
        reset: () => dispatch(reset()),
        setFatalErrorOccured: (value: boolean) => dispatch(setFatalErrorOccured(value)),
        initGameState: (args: InitGameStateVariables) => dispatch(initGameState(args)).unwrap(),
        endGame: (xp: number) => dispatch(endGame({xp})).unwrap(),
        damageCharacter: (targetId: string, damage: number) => dispatch(damageCharacter({characterId: targetId, damage: damage})).unwrap(),
        updateCharacter: (updateStats: UpdateCharacterVariables) => dispatch(updateCharacter(updateStats)).unwrap(),
    };
}

export default useGameReducer;