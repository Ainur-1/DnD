import useGameReducer from "@/features/game";
import { damageCharacter, updateCharacter, updateFight } from "@/features/game/model/gameSlice";
import { tryParseNumber } from "@/shared/utils/parsers";
import FormBox from "@/widgets/sign-in/ui/FormBox";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, List, ListItem, Paper, Skeleton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SuggesItemForm from "./SuggesItemForm";
import { FormField } from "@/shared/types/IFormField";
import { isDecimal } from "@/shared/utils/isDecimal";
import { useInventoryItemsQuery } from "@/features/inventory";
import { InventoryItemCard } from "@/entities/item";

interface DialogProps {
    showForm: boolean,
    closeDialog: () => void,
}

interface FormDialogProps extends DialogProps {
    characterId: string,
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

export function StartFightFormDialog({showForm, closeDialog}: DialogProps) {
    const { state, setFatalErrorOccured } = useGameReducer();
    if (state == undefined || !state?.gameInfo) {
        return <></>
    }

    const [values, setValues] = useState<{[key: string]: FormField<number>}>(state?.gameInfo.partyCharacters.
        filter(x => !x.mainStats.isDead)
        .reduce((acc, value, _) => {
        const key = value.id;
        acc[key] = {
            value: 1,
            error: null
        };
        return acc;
    }, {} as {[key: string]: FormField<number>}));
    const [fromError, setFormError] = useState("");
    const [requestSent, setRequestSent] = useState(false);

    function validDexValue(field: FormField<number>): boolean {
        const { value } = field;

        return typeof value === 'number' && 1 <= value && value <= 20 && !isDecimal(value);
    }

    function onChange(characterId: string, strValue: string | undefined) {
        if (!(characterId in values)) {
            return;
        }

        let error: string | null = null;
        if (strValue === undefined || strValue.trim().length == 0) {
            error = "Поле обязательно.";
        } 

        const { success, value } = tryParseNumber(strValue!.trim());
        let actualValue = 1;
        if (!success) {
            error = "Не число.";
        } else if (value! < 1 || value! > 20 || isDecimal(value!)) {
            actualValue = 1;
            error = "Кубик d20."
        } else {
            actualValue = value!;
        }

        setValues(prev => {
            return {
                ...prev,
                [characterId]: {
                    value: actualValue,
                    error,
                }
            }
        });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!Object.values(values).every(x => validDexValue(x))) {
            setFormError("Некоторые поля заполнены неверно.")
            return;
        }

        setRequestSent(true);
        setFormError("");
        try {
            await updateFight({
                isFight: true,
                basicInitiativeScoreValues: Object.keys(values).map(key => {
                    return {
                        characterId: key,
                        score: values[key].value!
                    };
                })
            });
        } catch {
            setFatalErrorOccured(true);
        } finally {
            setRequestSent(false);
            closeDialog();
        }
    };

    return (
        <Dialog 
            open={showForm}
            maxWidth="xs"
            fullWidth={true}
        >
            <DialogTitle>
                Начать режим боя
            </DialogTitle>
            <DialogContent>
                <FormBox handleSubmit={handleSubmit} formTitle="Значения бросков инициативы" formError={fromError}>
                    {state.gameInfo.partyCharacters
                        .filter(x => !x.mainStats.isDead)
                        .map((character, index) => <Grid key={`grid-fight-${index}`} container spacing={2}>
                            <Grid item xs={7.2}>
                                <Typography variant="h6">
                                    {character.personality.characterName}
                                </Typography>
                            </Grid>
                            <Grid item xs={2.4}>
                                <TextField 
                                    disabled={requestSent}
                                    value={values[character.id].value} 
                                    onChange={(e) => onChange(character.id, e.target.value)} 
                                    fullWidth  
                                    label="Лов." 
                                    type="number" 
                                    error={values[character.id].error != null}
                                />
                            </Grid>
                            <Grid item xs={2.4}>
                                <Typography variant="body2">
                                    + {character.otherStats.dexterityModifier}
                                </Typography>
                            </Grid>
                    </Grid>)}
                    <Button disabled={!Object.values(values).every(x => validDexValue(x)) || requestSent} type="submit" fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                        Лечить
                    </Button>
                </FormBox>
            </DialogContent>
        </Dialog>
    )
}

interface ShowInventoryDialogProps extends DialogProps {
    characterId: string
}

export function ShowInventoryDialog({characterId, showForm}: ShowInventoryDialogProps) {
    const { data, isLoading, isSuccess } = useInventoryItemsQuery({
        characterId
    });

    return (
        <Dialog 
            open={showForm}
            maxWidth="xs"
            fullWidth={true}
        >
            <DialogTitle>
                Инвентарь
            </DialogTitle>
            <DialogContent>
                <Paper style={{overflow: 'auto'}}>
                    { isLoading && <Skeleton animation="wave" variant="rounded" width="auto" height="100%"/>}
                    {
                        isSuccess &&
                        <List>
                            {data.items
                                .map(item => <ListItem key={item.id}>
                                <InventoryItemCard 
                                    title={item.item.name} 
                                    iconUrl={item.item.iconUrl} 
                                    count={item.count} 
                                    cardHeight={64} />
                                Здесь кнопки действия
                            </ListItem>
                            )}
                        </List>
                    }
                </Paper>
            </DialogContent>
        </Dialog>
    )
}