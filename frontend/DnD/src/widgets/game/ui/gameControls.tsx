import { Box, Button, Grid, Stack } from "@mui/material";
import { ButtonProps, ButtonPropsWithChildren } from "../model/widgetTypes";
import SavingThrowsDisplay from "./savingThrowsDisplay";
import EquippedItemsList from "./equippedItemsList";
import useGameReducer from "@/features/game";
import { DeathSaves } from "@/entities/character/model/types";

interface UserControlBarProps {
    findMeButtonInfo: ButtonProps
    ineventoryButtonInfo: ButtonProps
}

const controlMinHeight = 300;

function UserControlBar({findMeButtonInfo, ineventoryButtonInfo}: UserControlBarProps) {
    const { state } = useGameReducer();
    const characterId = state.gameInfo.userCharacterId;

    return <Grid container height={controlMinHeight} spacing={2}>
            <Grid item xs={4}>
                <Stack spacing={1} paddingTop={2}>
                    <Button variant="contained" onClick={findMeButtonInfo.onClick} size="small" fullWidth>
                        Найти меня
                    </Button> 
                    <Button variant="contained" onClick={ineventoryButtonInfo.onClick} size="large" fullWidth>
                        Инвентарь
                    </Button> 
                </Stack>
            </Grid>
            <Grid item xs={8}>
                <Box height="100%">
                    <EquippedItemsList characterId={characterId}/>
                </Box>
            </Grid>
        </Grid>
}

interface DeadUserControlBar {
}

function DeadUserControlBar({}: DeadUserControlBar) {
    const { state } = useGameReducer();

    const deathSaves = state!.gameInfo.deathSaves ?? {
        failureCount: 0,
        successCount: 0,
    };

    //todo: useUpdateDeathSaves mutation
    async function updateDeathSaves(deathSaves: DeathSaves) {

    }

    async function changeSuccessCount(number: number | null) {
        const value = number ?? 0;
        
    } 

    async function changeFailuresCount(number: number | null) {
        const value = number ?? 0;
        
    } 

    return <Stack height={controlMinHeight}>
        <SavingThrowsDisplay 
            successCount={deathSaves.successCount} 
            failuresCount={deathSaves.failureCount} 
            changeSuccessCount={changeSuccessCount} 
            changeFailuresCount={changeFailuresCount} />
    </Stack>
}

interface GameMasterControlBarProps {
    fightButtonInfo: ButtonPropsWithChildren
}

function GameMasterControlBar({fightButtonInfo}: GameMasterControlBarProps) {
    return <Stack height={controlMinHeight}>
        <Button variant="contained" disabled={fightButtonInfo.disabled} onClick={fightButtonInfo.onClick}>
            {fightButtonInfo.children}
        </Button>
    </Stack>
}

interface ControlBarProps {
    handleFightButtonClick: () => void, 
    findMyCharacter: () => void,
    openInventory: () => void,

}

export default function BottomControlBar({handleFightButtonClick, findMyCharacter, openInventory}: ControlBarProps) {
    const { state } = useGameReducer();

    if (!state) {
        return <></>
    }

    const isGameMaster = state.isUserGameMaster;
    const game = state.gameInfo;

    return <>
        {isGameMaster && <GameMasterControlBar fightButtonInfo={{
            children: `${game.isFighting ? "Завершить": "Начать" } битву`,
            onClick: handleFightButtonClick,
        }} />}
        {!isGameMaster && <>
            {game.deathSaves && <DeadUserControlBar />}
            {!game.deathSaves && <UserControlBar findMeButtonInfo={{
                onClick: findMyCharacter,
            }} ineventoryButtonInfo={{
                onClick: openInventory
            }} />}
        </>}
    </>
}