import { Box, Button, Grid, Stack } from "@mui/material";
import { ButtonProps } from "../model/widgetTypes";
import SavingThrowsDisplay from "./savingThrowsDisplay";
import EquippedItemsList from "./equippedItemsList";
import useGameReducer from "@/features/game";
import { DeathSaves } from "@/entities/character/model/types";
import { ShowInventoryDialog, StartFightFormDialog } from "./formDialogs";
import { useState } from "react";

interface UserControlBarProps {
    findMeButtonInfo: ButtonProps
}

const controlMinHeight = 300;

function UserControlBar({findMeButtonInfo}: UserControlBarProps) {
    const { state } = useGameReducer();
    const characterId = state!.gameInfo.userCharacterId;
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);

    return <>
        <Grid container height={controlMinHeight} spacing={2}>
                <Grid item xs={4}>
                <Stack spacing={1} paddingTop={2}>
                    <Button variant="contained" onClick={findMeButtonInfo.onClick} size="small" fullWidth>
                        Найти меня
                    </Button> 
                    <Button variant="contained" onClick={() => setIsInventoryOpen(true)} size="large" fullWidth>
                        Инвентарь
                    </Button> 
                </Stack>
            </Grid>
            <Grid item xs={8}>
                <Box height="100%">
                    <EquippedItemsList characterId={characterId!}/>
                </Box>
            </Grid>
        </Grid>
        <ShowInventoryDialog showForm={isInventoryOpen} characterId={characterId!} closeDialog={() => setIsInventoryOpen(false)} />
    </>
}

interface DyingUserControlBar {
}

function DyingUserControlBar({}: DyingUserControlBar) {
    const { state, setFatalErrorOccured, updateDeathSaves } = useGameReducer();
    const [ requestSent, setRequestSent ] = useState(false);

    if(state === undefined) {
        return <></>
    }

    const deathSaves = state!.gameInfo.deathSaves ?? {
        failureCount: 0,
        successCount: 0,
    };

    async function onUpdateDeathSaves(deathSaves: DeathSaves) {
        if (requestSent) {
            return;
        }

        setRequestSent(true);
        try {
            const character = state?.gameInfo.partyCharacters.find(x => x.id === state.gameInfo.userCharacterId);
            if (character === undefined) {
                return;
            }

            await updateDeathSaves(deathSaves);
        } catch {
            setFatalErrorOccured(true);
        } finally {
            setRequestSent(false);
        }
    }

    function changeSuccessCount(number: number | null) {
        const value = number ?? 0;

        return onUpdateDeathSaves({
            ...deathSaves,
            successCount: value,
        });
    } 

    function changeFailuresCount(number: number | null) {
        const value = number ?? 0;

        return onUpdateDeathSaves({
            ...deathSaves,
            failureCount: value,
        });
    } 

    return <Stack height={controlMinHeight}>
        <SavingThrowsDisplay 
            readonly = {requestSent}
            successCount={deathSaves.successCount} 
            failuresCount={deathSaves.failureCount} 
            changeSuccessCount={changeSuccessCount} 
            changeFailuresCount={changeFailuresCount} />
    </Stack>
}

interface GameMasterControlBarProps {
}

function GameMasterControlBar({}: GameMasterControlBarProps) {
    const { state, setFatalErrorOccured, updateFight } = useGameReducer();
    const [endFightRequestSent, setEndFightRequestSent] = useState(false);

    if (!state) {
        return <></>
    }

    const [startFightFormDialogOpen, setStartFightFormDialogOpen] = useState(false); 

    const startFightClick = () => setStartFightFormDialogOpen(true);

    const endFightClick = async () => {
        setEndFightRequestSent(true);
        try {
            await updateFight({ isFight: false, basicInitiativeScoreValues: null });
        } catch {
            setFatalErrorOccured(false);
        } finally {
            setEndFightRequestSent(false);
        }
    }

    return <Stack height={controlMinHeight}>
        <Button disabled={endFightRequestSent} variant="contained" onClick={state.gameInfo.isFighting ? endFightClick : startFightClick}>
            {`${state.gameInfo.isFighting ? "Завершить": "Начать" } битву`}
        </Button>
        <StartFightFormDialog showForm={startFightFormDialogOpen} closeDialog={() => setStartFightFormDialogOpen(false)} />
    </Stack>
}

interface ControlBarProps {
    findMyCharacter: () => void,
}

export default function BottomControlBar({findMyCharacter}: ControlBarProps) {
    const { state } = useGameReducer();

    const isGameMaster = state!.isUserGameMaster;
    const game = state!.gameInfo;
    const userCharacter = game.partyCharacters.find(x => x.id === game.userCharacterId);

    return <>
        {isGameMaster && <GameMasterControlBar />}
        {!isGameMaster && <>
            {!userCharacter?.mainStats.isDead && game.deathSaves && <DyingUserControlBar />}
            {userCharacter && !userCharacter.mainStats.isDead && !game.deathSaves && 
            <UserControlBar findMeButtonInfo={{
                onClick: findMyCharacter,
                disabled: true,
            }}
            />}
        </>}
    </>
}