import { Box, Button, Grid, Stack } from "@mui/material";
import { ButtonProps, ButtonPropsWithChildren } from "../model/widgetTypes";
import { ReactNode } from "react";
import SavingThrowsDisplay from "./savingThrowsDisplay";
import EquippedItemsList from "./equippedItemsList";

interface UserControlBarProps {
    characterId: string,
    findMeButtonInfo: ButtonProps
    ineventoryButtonInfo: ButtonProps
}

const controlMinHeight = 300;

export function UserControlBar({findMeButtonInfo, characterId, ineventoryButtonInfo}: UserControlBarProps) {

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
    successCount: number | null,
    failuresCount: number | null,
    changeSuccessCount: (value: number | null) => void,
    changeFailuresCount: (value: number | null) => void,
}

export function DeadUserControlBar({successCount, failuresCount, changeSuccessCount, changeFailuresCount}: DeadUserControlBar) {
    return <Stack height={controlMinHeight}>
        <SavingThrowsDisplay 
            successCount={successCount} 
            failuresCount={failuresCount} 
            changeSuccessCount={changeSuccessCount} 
            changeFailuresCount={changeFailuresCount} />
    </Stack>
}

interface GameMasterControlBarProps {
    fightButtonInfo: ButtonPropsWithChildren
}

export function GameMasterControlBar({fightButtonInfo}: GameMasterControlBarProps) {
    return <Stack height={controlMinHeight}>
        <Button variant="contained" disabled={fightButtonInfo.disabled} onClick={fightButtonInfo.onClick}>
            {fightButtonInfo.children}
        </Button>
    </Stack>
}