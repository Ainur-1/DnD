import { anyError, ItemFormBaseActionType, stateToItem } from "@/entities/item/model/ItemFormBaseReducer";
import { ExpandedInventoryItem } from "@/entities/item/model/types";
import { ItemFormBaseBody, ItemFormBaseDispatchContext, ItemFormBaseStateContext, ItemFormBaseStateProvider } from "@/entities/item/ui/ItemForm";
import { tryParseNumber } from "@/shared/utils/parsers";
import { Box, Button, Container, Divider, FormControlLabel, FormGroup, Grid, Switch, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

interface AddItemToInventoryFormProps {
    onItemSubmit: (item: ExpandedInventoryItem) => void;
    formError?: string;
    submitButtonText?: string;
}

function Form({onItemSubmit, formError, submitButtonText}: AddItemToInventoryFormProps) {
    const [requestSent, setRequestSent] = useState(false);

    const state = useContext(ItemFormBaseStateContext);
    const dispatch = useContext(ItemFormBaseDispatchContext);
    /* guard */
    {
        if (state == undefined || dispatch == undefined) {
            throw new Error("ItemFormContext usage outside of provider!");
        }
    }

    const [count, setCount] = useState<number|undefined>(1);
    const [countError, setCountError] = useState("");
    const [inUse, setInUse] = useState(false);
    const [proficiencyOn, setProficiencyOn] = useState(false);

    const onCountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const strValue = e.target.value.trim();
        if (strValue.length == 0) {
            setCount(undefined);
            setCountError("Поле обязательно.");
            return;
        }

        const { success, value } = tryParseNumber(strValue);
        if (!success) {
            setCountError("Не число.");
            setCount(undefined);
            return;
        }

        const floored = Math.floor(value!);
        if (floored < 1) {
            setCountError("Не менее 1 предмета.");
            setCount(1);
            return;
        }

        setCountError("");
        setCount(floored);
    };

    const resetForm = () => {
        dispatch!({
            type: ItemFormBaseActionType.resetForm,
        });
        setCount(1);
        setCountError("");
        setInUse(false);
        setProficiencyOn(false);
    }

    async function onSubmit() {
        if (requestSent) {
            dispatch!({
                type: ItemFormBaseActionType.setFormError,
                error: "Запрос уже отпарвлен."
            });
            return;
        }

        setRequestSent(true);
        try {
            if (anyError(state)) {
                dispatch!({
                    type: ItemFormBaseActionType.setFormError,
                    error: "Некоторые поля заполнены неверно."
                });
                return;
            }

            const item = stateToItem(state);
            if (!item) {
                dispatch!({
                    type: ItemFormBaseActionType.setFormError,
                    error: "Не валидное состояние формы. Заполните поля снова."
                });
            } else if (!count) {
                setCountError("Заполните поле.");
            } else {
                setCountError("");
                dispatch!({
                    type: ItemFormBaseActionType.setFormError,
                    error: ""
                });

                await onItemSubmit({
                    id: "",
                    count: count!,
                    inUse: inUse,
                    isItemProficiencyOn: proficiencyOn,
                    item: item
                });

                resetForm();
            }
        } catch {
            resetForm();
            dispatch!({
                type: ItemFormBaseActionType.setFormError,
                error: "Произошла ошибка при обработке формы."
            });
        } finally {
            setRequestSent(false);
        }
    }

    return <Box paddingTop={1} component="form">
        <Grid container spacing={2}>
            <Container>
                <Typography variant="body2" color="error" textAlign="center">
                    {formError || state.formError}
                </Typography>
            </Container>
            <ItemFormBaseBody disabled={requestSent}/>
        <Grid item xs={12} gap={0} rowGap={0} rowSpacing={0}>
            <Divider />
        </Grid>
        <Grid item xs={6}>
            <FormGroup>
                <FormControlLabel 
                    disabled={requestSent} 
                    control={<Switch onChange={(e) => setInUse(e.target.checked)}
                        disabled={requestSent} 
                        checked={inUse} />} 
                    label="Снарядить" 
                    labelPlacement="start" />
                <FormControlLabel 
                    disabled={requestSent}
                    control={<Switch onChange={(e) => setProficiencyOn(e.target.checked)}
                        disabled={requestSent}
                        checked={proficiencyOn}
                    />} 
                    label="Владение предметом"
                    labelPlacement="start" />
            </FormGroup>
        </Grid>
        <Grid item xs={6}>
                <TextField 
                    disabled={requestSent}
                    value={count}
                    onChange={onCountChange} 
                    margin="normal" 
                    required 
                    fullWidth  
                    label="Количество" 
                    type="number" 
                    autoFocus
                    helperText={countError}
                    error={countError != ""}
                />
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" alignContent="center">
                    <Button disabled={requestSent} onClick={onSubmit} variant="contained">
                        {submitButtonText}
                    </Button>
                </Box>
            </Grid>
        </Grid>
    </Box>
} 

export default function AddItemToInventoryForm(props: AddItemToInventoryFormProps) {

    return <ItemFormBaseStateProvider>
        <Form {...props} />
    </ItemFormBaseStateProvider>
}