import useGameReducer from "@/features/game";
import { damageCharacter, updateCharacter } from "@/features/game/model/gameSlice";
import AppTabs from "@/shared/ui/Tabs";
import { tryParseNumber } from "@/shared/utils/parsers";
import FormBox from "@/widgets/sign-in/ui/FormBox";
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Tab, Tabs, TextField } from "@mui/material";
import { useState } from "react";
import SuggesItemForm from "./SuggesItemForm";

interface FormDialogProps {
    showForm: boolean,
    characterId: string,
    closeDialog: () => void,
}

interface HealFormDialogProps extends FormDialogProps {
}

export function HealFormDialog({showForm, characterId, closeDialog}: HealFormDialogProps) {
    const [tempHpAddition, setTempHpAddition] = useState<number | undefined>();
    const [tempHpAdditionError, setTempHpAdditionError] = useState("");
    const [hpAddition, setHpAddition] = useState<number | undefined>();
    const [hpAdditionError, setHpAdditionError] = useState("");
    const [formError, setFormError] = useState("");
    const { state, setFatalErrorOccured } = useGameReducer();
    const [requestSent, setRequestSent] = useState(false);

    if (state == undefined) {
        return <></>
    }

    const charcter = state.gameInfo.partyCharacters.find(x => x.id == characterId);

    if (charcter == undefined) {
        setFatalErrorOccured(true);
        return <></>
    }

    const maxAvailableHpAddition = charcter.otherStats.maxHp - charcter.mainStats.hp;

    const onHpChange = (strValue: string) => {
        const { success, value: maybeValue } = tryParseNumber(strValue);
        if (success) {
            const value = Math.floor(maybeValue!);
            if (value > maxAvailableHpAddition) {
                setHpAdditionError(`Макс. +${maxAvailableHpAddition}`);
            } else if (maxAvailableHpAddition == 0) {
                setHpAdditionError("У персонажа максимальное количество здоровья!");
                setHpAddition(undefined);
            } else {
                setHpAddition(value == 0 ? undefined : value);
                setHpAdditionError("");
            }
            setFormError("");
        } else {
            setHpAdditionError(`Введите число (макс. ${maxAvailableHpAddition}).`);
        }
    }

    const onTempHpChange = (strValue: string) => {
        const { success, value } = tryParseNumber(strValue);
        if (success) {
            setTempHpAddition(Math.floor(value!));
        } else {
            setTempHpAdditionError("Введите число.");
        }
        setFormError("");
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (requestSent) {
            setFormError("Запрос уже отправлен.");
            return;
        }
        const rangeErrorLabel = "Не верный диапозон значений.";
        
        setFormError("");
        if (!hpAddition || !tempHpAddition) {
            setFormError("Введите +HP и/или +TempHp.");
            return;
        }

        if (hpAddition && hpAddition <= 0) {
            setHpAdditionError(rangeErrorLabel);
            return;
        }

        if (tempHpAddition && tempHpAddition <= 0) {
            setTempHpAdditionError(rangeErrorLabel);
            return;
        }

        setRequestSent(true);
        try {
            await updateCharacter({
                targetCharacterId: characterId,
                hp: hpAddition ? charcter.mainStats.hp + hpAddition : undefined,
                tempHp: tempHpAddition ? charcter.mainStats.tempHp + tempHpAddition : undefined
            });
        } catch {
            setFatalErrorOccured(true);
        } finally {
            setRequestSent(false);
            closeDialog();
        }
    }

    return (
        <Dialog 
            open={showForm}
            maxWidth="xs"
            fullWidth={true}
        >
            <DialogTitle>
                Лечить персонажа
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    На сколько единиц увеличить здоровье персонажа? 
                </DialogContentText>
                <FormBox handleSubmit={handleSubmit} formTitle={""} formError={formError}>
                    <TextField 
                        value={hpAddition} 
                        disabled={maxAvailableHpAddition == 0}
                        onChange={(e) => onHpChange(e.target.value)} 
                        margin="normal" 
                        fullWidth  
                        label="+ HP" 
                        type="number" 
                        autoFocus
                        helperText={hpAdditionError}
                        error={hpAdditionError != ""}
                    />
                    <TextField 
                        value={tempHpAddition}
                        onChange={(e) => onTempHpChange(e.target.value)}
                        margin="normal" 
                        fullWidth 
                        label="+ Temp HP" 
                        type="number"
                        error={tempHpAdditionError != ""}
                    />
                    <Button disabled={requestSent} type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                        Лечить
                    </Button>
                </FormBox>
            </DialogContent>
        </Dialog>
    )
}

export function DamageFormDialog({showForm, characterId, closeDialog}: HealFormDialogProps) {
    const [damage, setDamage] = useState<number | undefined>();
    const [damageError, setDamageError] = useState("");
    const [formError, setFormError] = useState("");
    const { state, setFatalErrorOccured } = useGameReducer();
    const [requestSent, setRequestSent] = useState(false);

    if (state == undefined) {
        return <></>
    }

    const charcter = state.gameInfo.partyCharacters.find(x => x.id == characterId);

    if (charcter == undefined) {
        setFatalErrorOccured(true);
        return <></>
    }

    const onDamageValueChange = (damageStr: string) => {
        const { success, value } = tryParseNumber(damageStr);

        if (success) {
            setDamageError("");
            setDamage(value!);
        } else {
            setDamageError("Не верный формат");
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (requestSent) {
            setFormError("Запрос уже отправлен.");
            return;
        }

        const rangeErrorLabel = "Не верный диапозон значений.";
        if (damage == undefined) {
            setDamageError("Введите наносимый урон.");
            return;
        } else if (damage <= 0) {
            setDamageError(rangeErrorLabel);
            return;
        }
        
        setFormError("");
        setRequestSent(true);
        try {
            await damageCharacter({
                characterId,
                damage: damage as number,
            });
        } catch {
            setFatalErrorOccured(true);
        } finally {
            setRequestSent(false);
            closeDialog();
        }
    }

    return (
        <Dialog 
            open={showForm}
            maxWidth="xs"
            fullWidth={true}
        >
            <DialogTitle>
                Атаковать персонажа
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Значение наносимого урона
                </DialogContentText>
                <FormBox handleSubmit={handleSubmit} formTitle={""} formError={formError}>
                    <TextField 
                        value={damage} 
                        onChange={(e) => onDamageValueChange(e.target.value)} 
                        margin="normal" 
                        fullWidth  
                        label="Damage" 
                        type="number" 
                        autoFocus
                        helperText={damageError}
                        error={damageError != ""}
                    />
                    <Button disabled={requestSent} type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                        Нанести урон
                    </Button>
                </FormBox>
            </DialogContent>
        </Dialog>
    )
}

export function SuggestFormDialog({showForm, characterId, closeDialog}: HealFormDialogProps) {
    const { state } = useGameReducer();

    if (state == undefined) {
        return <></>
    }

    return (
        <Dialog 
            open={showForm}
            maxWidth="xs"
            fullWidth={true}
        >
            <DialogTitle>
                Предложить предмет
            </DialogTitle>
            <DialogContent>
                <SuggesItemForm characterId={characterId} closeForm={closeDialog} loadInventory={!state.isUserGameMaster}/>
            </DialogContent>
        </Dialog>
    )
}