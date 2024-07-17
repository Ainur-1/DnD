import { useAppDispatch, useAppSelector } from "@/shared/redux-type-hooks";
import { damageCharacter, endGame, healCharacter, initGameState, reset, resurrect, setFatalErrorOccured, updateCharacter, updateDeathSaves, updateFight } from "./model/gameSlice";
import { InitGameStateVariables } from "./model/types";
import { HealCharacterVariables, UpdateCharacterVariables, UpdateFightVariables } from "./model/signalRTypes";
import { DeathSavesDto } from "@/shared/api/gql/graphql";


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
        updateFight: (args: UpdateFightVariables) => dispatch(updateFight(args)).unwrap(),
        healCharacter: (args: HealCharacterVariables) => dispatch(healCharacter(args)).unwrap(),
        updateDeathSaves: (args: DeathSavesDto) => dispatch(updateDeathSaves(args)).unwrap(),
        resurrect: (targetId?: string) => dispatch(resurrect({targetId})).unwrap(),
    };
}

export default useGameReducer;