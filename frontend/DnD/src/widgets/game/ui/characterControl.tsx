import { ReactChildrenProps } from "@/shared/types/reactChildrenProps";
import { Button, Container, Stack } from "@mui/material";
import { ButtonProps, ButtonPropsWithChildren } from "../model/widgetTypes";

const OutlinedButton = ({onClick, children, disabled}: ButtonPropsWithChildren) =>
    <Button variant="outlined" onClick={onClick} disabled={disabled}>
        {children}
    </Button> 

const SuggestButton = ({onClick, disabled}: ButtonProps) => 
    <OutlinedButton disabled={disabled} onClick={onClick}>
        Предложить предмет
    </OutlinedButton>

const HitButton = ({onClick, disabled}: ButtonProps) => 
    <OutlinedButton disabled={disabled} onClick={onClick}>
        Нанести урон
    </OutlinedButton>

const HealButton = ({onClick, disabled}: ButtonProps) => 
    <OutlinedButton disabled={disabled} onClick={onClick}>
        Лечить
    </OutlinedButton>

function ButtonBar({children}: ReactChildrenProps) {

    return <Container sx={{
        minHeight: 90,
        alignItems: "end",
        paddingBottom: 2
    }}>
        <Stack gap={1.5} >
            {children}
        </Stack>
    </Container>
}

interface RestrictedCharacterControlBarProps {
    suggestButtonInfo: ButtonProps,
}

export function RestrictedCharacterControlBar({suggestButtonInfo}: RestrictedCharacterControlBarProps) {
    
    return <ButtonBar>
        <SuggestButton disabled={suggestButtonInfo.disabled} onClick={suggestButtonInfo.onClick}/>
    </ButtonBar>
}

interface CharacterControlBarProps {
    hitButtonInfo: ButtonProps,
    healButtonInfo: ButtonProps,
}

export default function CharacterControlBar({hitButtonInfo, healButtonInfo}: CharacterControlBarProps) {
    
    return <ButtonBar>
        <HitButton disabled={hitButtonInfo.disabled} onClick={hitButtonInfo.onClick}/>
        <HealButton disabled={healButtonInfo.disabled} onClick={healButtonInfo.onClick}/> 
    </ButtonBar>
}

interface GameMasterCharacterControlBarProps extends CharacterControlBarProps, RestrictedCharacterControlBarProps {
    resurrectButtonInfo: ButtonProps
}

export function GameMasterCharacterControlBar({
    suggestButtonInfo, 
    hitButtonInfo, 
    healButtonInfo, 
    resurrectButtonInfo}: GameMasterCharacterControlBarProps) {
    
    return <ButtonBar>
        <Button disabled={resurrectButtonInfo.disabled} onClick={resurrectButtonInfo.onClick}>
            Воскресить персонажа
        </Button>
        <SuggestButton disabled={suggestButtonInfo.disabled} onClick={suggestButtonInfo.onClick}/>
        <HitButton disabled={hitButtonInfo.disabled} onClick={hitButtonInfo.onClick}/>
        <HealButton disabled={healButtonInfo.disabled} onClick={healButtonInfo.onClick}/> 
    </ButtonBar>
}
