import useGameReducer from "@/features/game";
import { tryParseNumber } from "@/shared/utils/parsers";
import FormBox from "@/widgets/sign-in/ui/FormBox";
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, List, ListItem, Paper, Skeleton, Stack, Switch, TextField, Typography } from "@mui/material";
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
    const [tempHp, settempHp] = useState<number | undefined>();
    const [tempHpError, settempHpError] = useState("");
    const [hpAddition, setHpAddition] = useState<number | undefined>();
    const [hpAdditionError, setHpAdditionError] = useState("");
    const [usedHitDiceCount, setUsedHitDiceCount] = useState<number|undefined>(0);
    const [usedHitDiceCountError, setUsedHitDiceCountError] = useState("");
    const [formError, setFormError] = useState("");
    const { state, setFatalErrorOccured } = useGameReducer();
    const [requestSent, setRequestSent] = useState(false);
    const { healCharacter } = useGameReducer();

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
                setHpAddition(Math.abs(value));
                setHpAdditionError("");
            }
            setFormError("");
        } else {
            setHpAddition(undefined);
            setHpAdditionError(`Введите число (макс. ${maxAvailableHpAddition}).`);
        }
    }

    const onTempHpChange = (strValue: string) => {
        const { success, value } = tryParseNumber(strValue);
        if (success) {
            settempHp(Math.floor(Math.abs(value!)));
            settempHpError("");
        } else {
            settempHpError("Введите число.");
            settempHp(undefined);
        }
        setFormError("");
    }

    const onDiceCountChange = (strValue: string) => {
        const { success, value } = tryParseNumber(strValue);
        if (success) {
            setUsedHitDiceCount(Math.floor(Math.abs(value!)));
            setUsedHitDiceCountError("");
        } else {
            setUsedHitDiceCountError("Введите число.");
            setUsedHitDiceCount(undefined);
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
        if (!(hpAddition || tempHp)) {
            setFormError("Введите +HP и/или +TempHp.");
            return;
        }

        if (hpAddition && hpAddition <= 0) {
            setHpAdditionError(rangeErrorLabel);
            return;
        }

        if (tempHp && tempHp <= 0) {
            settempHpError(rangeErrorLabel);
            return;
        }

        setRequestSent(true);
        try {
            await healCharacter({
                targetId: characterId,
                hpAddition: hpAddition,
                tempHp: tempHp,
                usedHitDicesCount: usedHitDiceCount,
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
            scroll="body"
            onClose={closeDialog}
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
                        value={tempHp}
                        onChange={(e) => onTempHpChange(e.target.value)}
                        margin="normal" 
                        fullWidth 
                        label="Установить Temp HP" 
                        type="number"
                        error={tempHpError != ""}
                    />
                    <TextField 
                        value={usedHitDiceCount}
                        onChange={(e) => onDiceCountChange(e.target.value)}
                        margin="normal" 
                        fullWidth 
                        label="Потрачено костей здоровья" 
                        type="number"
                        error={usedHitDiceCountError != ""}
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
    const { damageCharacter } = useGameReducer();

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
            await damageCharacter(
                characterId,
                damage as number,
            );
        } catch {
            setFatalErrorOccured(true);
        } finally {
            setRequestSent(false);
            closeDialog();
        }
    }

    return (
        <Dialog 
            onClose={closeDialog}
            open={showForm}
            maxWidth="xs"
            fullWidth={true}
            scroll="body"
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
            onClose={closeDialog}
            maxWidth="xs"
            fullWidth={true}
            scroll="body"
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
    const { state, setFatalErrorOccured, updateFight } = useGameReducer();
    if (state == undefined || !state?.gameInfo) {
        return <></>
    }

    const [values, setValues] = useState<{[key: string]: FormField<number>}>(state?.gameInfo.partyCharacters
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

        let error: string | null = null;
        if (strValue === undefined || strValue.trim().length == 0) {
            error = "Поле обязательно.";
        } 

        const { success, value } = tryParseNumber(strValue!.trim());
        let actualValue: number | undefined = 1;
        if (!success) {
            error = "Не число.";
            actualValue = undefined;
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
            scroll="body"
            onClose={closeDialog}
        >
            <DialogContent>
                <Stack>
                    <Typography component="h5" variant="h5" fontWeight="bold">
                        Инициатива
                    </Typography>
                    <Typography component="h6" variant="h6" color="error" textAlign="center">
                        {fromError}
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                        {state.gameInfo.partyCharacters
                            .filter(x => !x.mainStats.isDead)
                            .map((character, index) => <Grid key={`grid-fight-${index}`} container spacing={2}>
                                <Grid item xs={7.2} alignContent="center">
                                    <Typography variant="h6" fontWeight="bold">
                                        {character.personality.characterName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.4} alignContent="center">
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
                                <Grid item xs={2.4} alignContent="center">
                                    <Typography>
                                        + {character.otherStats.dexterityModifier}
                                    </Typography>
                                </Grid>
                        </Grid>)}

                        <Button disabled={!Object.values(values).every(x => validDexValue(x)) || requestSent} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Битва
                        </Button>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

interface ShowInventoryDialogProps extends DialogProps {
    characterId: string
}

export function ShowInventoryDialog({characterId, showForm, closeDialog}: ShowInventoryDialogProps) {
    const { data, isLoading, isSuccess } = useInventoryItemsQuery({
        characterId
    });

    return (
        <Dialog 
            open={showForm} 
            maxWidth="xs"
            fullWidth={true}
            scroll="paper"
            onClose={closeDialog}
        >
            <DialogTitle>
                Инвентарь
            </DialogTitle>
            <DialogContent style={{overflow: 'auto'}}>
                { isLoading && <Skeleton animation="wave" variant="rounded" width="auto" height="100%"/>}
                {
                    isSuccess &&
                    <List>
                        {data.characterInventory.items
                            .map(item => <ListItem key={item.id}>
                            <InventoryItemCard 
                                title={item.item.armor?.name ?? item.item.stuff?.name ?? item.item.weapon?.name ?? ""} 
                                iconUrl={""} 
                                count={item.count} 
                                cardHeight={64} />
                            <Stack>
                                <Switch/>
                                <Switch/>
                            </Stack>
                        </ListItem>
                        )}
                    </List>
                }
            </DialogContent>
        </Dialog>
    )
}