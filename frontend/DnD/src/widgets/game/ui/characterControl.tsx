import { ReactChildrenProps } from "@/shared/types/reactChildrenProps";
import { Button, Container, Stack } from "@mui/material";
import { ButtonProps, ButtonPropsWithChildren } from "../model/widgetTypes";
import useGameReducer from "@/features/game";
import { useState } from "react";
import { DamageFormDialog, HealFormDialog, SuggestFormDialog } from "./formDialogs";

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

interface RestrictedControlBarProps {
    suggestButtonInfo: ButtonProps,
}

function RestrictedControlBar({suggestButtonInfo}: RestrictedControlBarProps) {
    
    return <ButtonBar>
        <SuggestButton disabled={suggestButtonInfo.disabled} onClick={suggestButtonInfo.onClick}/>
    </ButtonBar>
}

interface StandartControlBarProps {
    hitButtonInfo: ButtonProps,
    healButtonInfo: ButtonProps,
}

function StandartControlBar({hitButtonInfo, healButtonInfo}: StandartControlBarProps) {
    
    return <ButtonBar>
        <HitButton disabled={hitButtonInfo.disabled} onClick={hitButtonInfo.onClick}/>
        <HealButton disabled={healButtonInfo.disabled} onClick={healButtonInfo.onClick}/> 
    </ButtonBar>
}

interface GameMasterControlBarProps extends StandartControlBarProps, RestrictedControlBarProps {
    resurrectButtonInfo: ButtonPropsWithChildren
}

function GameMasterControlBar({
    suggestButtonInfo, 
    hitButtonInfo, 
    healButtonInfo, 
    resurrectButtonInfo}: GameMasterControlBarProps) {
    
    return <ButtonBar>
        <Button variant="outlined" disabled={resurrectButtonInfo.disabled} onClick={resurrectButtonInfo.onClick}>
            {resurrectButtonInfo.children}
        </Button>
        <SuggestButton disabled={suggestButtonInfo.disabled} onClick={suggestButtonInfo.onClick}/>
        <HitButton disabled={hitButtonInfo.disabled} onClick={hitButtonInfo.onClick}/>
        <HealButton disabled={healButtonInfo.disabled} onClick={healButtonInfo.onClick}/> 
    </ButtonBar>
}

interface ControlBarProps {
    characterId: string,
    showHealCharacterDialog: () => void,
    showDamageCharacterDialog: () => void,
    showSuggestItemDialog: () => void,
}

function ControlBar({characterId, showHealCharacterDialog, showDamageCharacterDialog, showSuggestItemDialog}: ControlBarProps) {
    const [resurrectSent, setResurrectSent] = useState(false);

    const { state, setFatalErrorOccured, resurrect, damageCharacter } = useGameReducer();

    if (state == undefined) {
        return <></>
    }
    const isGameMaster = state.isUserGameMaster;
    const userCharacterDead: boolean | undefined = findCharacterById(state.gameInfo.userCharacterId!)?.mainStats.isDead;

    function findCharacterById(id: string) {
        return state?.gameInfo.partyCharacters.find(x => x.id == id);
    }

    const resurrectToggleButton = async (characterId: string) => {
        setResurrectSent(true);
        const character = findCharacterById(characterId);
        if (!character) {
            return;
        }
        try {
            if (character.mainStats.isDead || character.mainStats.isDying) {
                await resurrect(characterId);
            } else {
                await damageCharacter(characterId, character.mainStats.hp + character.mainStats.tempHp);
            }
        } catch {
            setFatalErrorOccured(true);
        } finally {
            setResurrectSent(false);
        }
    }

    const suggestButtonInfo = {
        onClick: showSuggestItemDialog,
        disabled: userCharacterDead,
    }

    const healButtonInfo = {
        onClick: showHealCharacterDialog,
        disabled: userCharacterDead
    }

    const hitButtonInfo = {
        onClick: showDamageCharacterDialog,
        disabled: userCharacterDead,
    }

    if (isGameMaster) {
        return <GameMasterControlBar 
                resurrectButtonInfo={{
                    onClick: () => resurrectToggleButton(characterId), 
                    disabled: resurrectSent, 
                    children: state.gameInfo.partyCharacters.find(x => x.id == characterId)?.mainStats.isDead
                              ? "Воскрессить" : "Убить" }} 
                hitButtonInfo={hitButtonInfo} 
                healButtonInfo={healButtonInfo} 
                suggestButtonInfo={suggestButtonInfo} />
    } else if (state.gameInfo.userCharacterId == characterId) {
        return <StandartControlBar hitButtonInfo={hitButtonInfo} healButtonInfo={healButtonInfo} />
    }

    return <RestrictedControlBar suggestButtonInfo={suggestButtonInfo} />
}


interface CharacterControlBarProps {
    characterId: string,
}

export default function CharacterControlBarContainer({characterId}: CharacterControlBarProps) {
    const [isHealDialogOpen, setIsHealDialogOpen] = useState(false);
    const [isDamageOpen, setIsDamageOpen] = useState(false);
    const [isSuggestDialogOpen, setIsSuggestDialogOpen] = useState(false);

    return <>
        <ControlBar 
            characterId={characterId} 
            showHealCharacterDialog={() => setIsHealDialogOpen(true)} 
            showDamageCharacterDialog={() => setIsDamageOpen(true)}
            showSuggestItemDialog={() => setIsSuggestDialogOpen(true)}
        />
        <HealFormDialog showForm={isHealDialogOpen} characterId={characterId} closeDialog={() => setIsHealDialogOpen(false)} />
        <DamageFormDialog showForm={isDamageOpen} characterId={characterId} closeDialog={() => setIsDamageOpen(false)} />
        <SuggestFormDialog showForm={isSuggestDialogOpen} characterId={characterId} closeDialog={() => setIsSuggestDialogOpen(false)} />
    </>
}


