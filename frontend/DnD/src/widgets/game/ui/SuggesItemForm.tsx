import { List } from "@mui/icons-material";
import { Box, Button, Checkbox, Container, Divider, FormControlLabel, Grid, ListItem, Paper, Skeleton, TextField, Typography } from "@mui/material";
import { useInventoryItemsQuery } from "@/features/inventory";
import { ItemFromInventory } from "@/features/game/model/signalRTypes";
import { useContext, useState } from "react";
import AppTabs from "@/shared/ui/Tabs";
import FormBox from "@/widgets/sign-in/ui/FormBox";
import { tryParseNumber } from "@/shared/utils/parsers";
import useGameReducer from "@/features/game";
import { suggestItem } from "@/features/game/model/gameSlice";
import { InventoryItemCard, Item, ItemFormBaseStateProvider } from "@/entities/item";
import { ItemFormBaseBody, ItemFormBaseDispatchContext, ItemFormBaseStateContext } from "@/entities/item/ui/ItemForm";
import { anyError, ItemFormBaseActionType, stateToItem } from "@/entities/item/model/ItemFormBaseReducer";
import { FormStepsButtons } from "@/shared/ui/FormStepsButtons";

interface InventoryItemSelectorProps {
    characterId: string,
    selectItem: (item: ExtendedItemFromInventory) => void,
}

function InventoryItemSelector({characterId, selectItem}: InventoryItemSelectorProps) {
    const { data, isSuccess, isLoading, isError, refetch } = useInventoryItemsQuery({
        characterId
    });
    
    return <>
        { isLoading && <Skeleton animation="wave" variant="rounded" width="auto" height="100%"/>}
        { isSuccess && <Paper style={{ overflow: 'auto'}}>
                <List>
                    {data.items
                        .filter(item => !item.inUse)
                        .map(item => <ListItem key={item.id}>
                            <InventoryItemCard 
                                title={item.item.name} 
                                iconUrl={item.item.iconUrl} 
                                count={item.count} 
                                cardHeight={64} 
                                onCardClick={() => selectItem({
                                    count: item.count,
                                    inventoryItemId: item.id,
                                    item: item.item
                                })}
                            />
                        </ListItem>)
                    }
                </List>
            </Paper>
        }
        {   isError && <Container>
                <Button onClick={() => refetch()}>
                    Попробовать еще раз
                </Button>
            </Container>
        }
    </>
}

interface CreatePrototypeFromItemFormProps {
    setPrototype: (item: Item | null) => void,
}

const CreatePrototypeFromItemForm = ({setPrototype}: CreatePrototypeFromItemFormProps) => {
    const state = useContext(ItemFormBaseStateContext);
    const dispatch = useContext(ItemFormBaseDispatchContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const item = stateToItem(state);

        if (anyError(state) || !item) {
            dispatch?.({
                type: ItemFormBaseActionType.setFormError,
                error: "Некоторые данные не валидны."
            });
            return;
        } 
        
        dispatch?.({
            type: ItemFormBaseActionType.setFormError,
            error: null
        });
        setPrototype(item);
    };

    return <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Container>
                <Typography variant="body2" color="error" textAlign="center">
                    {state.formError}
                </Typography>
            </Container>
            <ItemFormBaseBody/>
            <Grid item xs={12}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignContent: "center"
                }}>
                    <Button type="submit" variant="contained">Далее</Button>
                </Box>
             </Grid>
        </Grid>
    </Box>
}

interface SuggesItemFormProps {
    characterId: string,
    loadInventory?: boolean,
    closeForm?: () => void
}

type ExtendedItemFromInventory = ItemFromInventory & {item: Item};
export default function SuggesItemForm({characterId, loadInventory = false, closeForm}: SuggesItemFormProps) {

    const [itemPrototype, setItemPrototype] = useState<Item | ExtendedItemFromInventory | null>(null);
    const [count, setCount] = useState<number|undefined>(1);
    const [countError, setCountError] = useState("");
    const [requestSent, setRequestSent] = useState(false);
    const { setFatalErrorOccured } = useGameReducer();

    const onCountChange = (str: string) => {
        const { success, value } = tryParseNumber(str);
        if (success) {
            let floored = Math.floor(value!);
            if (floored <= 0) {
                setCount(1);
                setCountError("Передайте хотябы 1 предмет.");
            } else if (itemPrototype != null 
                && !isRawItem(itemPrototype) 
                && (itemPrototype as ExtendedItemFromInventory).count < floored) {
                setCountError(`У вас нет такого (${floored}) количества предметов.`);
                setCount((itemPrototype as ExtendedItemFromInventory).count);
            } else {
                setCount(floored);
                setCountError("");
            }
        } else {
            setCount(undefined);
            setCountError("Введите число.");
        }
    };

    const selectItemFromInventory = (item: ExtendedItemFromInventory) => {
        setCount(item.count);
        setItemPrototype(item);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (itemPrototype == null) {
            backwardButtonClick();
            return;
        }

        setRequestSent(true);
        try {
            const item = isRawItem(itemPrototype) ? itemPrototype : {
                inventoryItemId: itemPrototype.inventoryItemId,
                count: itemPrototype.count
            };

            await suggestItem({
                targetCharacterId: characterId,
                item: item
            });
        } catch {
            setFatalErrorOccured(true);
        } finally {
            setRequestSent(false);
            if (closeForm){
                closeForm();
            }
        }
    };

    const isRawItem = (value: Item | ExtendedItemFromInventory): value is Item => (value as Item).name !== undefined;

    const getPrototypeName = (itemProto: Item | ExtendedItemFromInventory) => isRawItem(itemProto) ? (itemProto as Item).name : (itemProto as ExtendedItemFromInventory).item.name;

    const backwardButtonClick = () => {
        setCount(1);
        setCountError("");
        setItemPrototype(null);
    }

    const tabs = [];

    if (loadInventory) {
        tabs.push({
            label: "Из инвентаря",
            tabPanelChildren: <InventoryItemSelector characterId={characterId} selectItem={(itemFrom) => selectItemFromInventory(itemFrom)}/>
        });
        tabs.push({
            label: "Новый предмет",
            tabPanelChildren: <CreatePrototypeFromItemForm setPrototype={setItemPrototype} />
        });
    }

    return <Container>
        <ItemFormBaseStateProvider>
            {loadInventory && <>
                {itemPrototype == null && <AppTabs tabName="suggest-item-control" ariaLabel="suggest-item-control" tabs={tabs}/>}
                {itemPrototype != null && <FormBox formTitle={`Передача ${getPrototypeName(itemPrototype)}`} handleSubmit={handleSubmit}>
                    <FormControlLabel disabled control={<Checkbox disabled checked={!isRawItem(itemPrototype)}  value="remember" color="primary"/>} label="Пердмет из инвентаря"/>
                    <TextField 
                        disabled={requestSent}
                        value={count}
                        onChange={(e) => onCountChange(e.target.value)} 
                        margin="normal" 
                        required 
                        fullWidth  
                        label="Количество" 
                        type="number" 
                        autoFocus
                        helperText={countError}
                        error={countError != ""}
                    />
                    <FormStepsButtons
                        prevButtonText="Назад"
                        prevButtonDisabled={requestSent}
                        onPrevButtonClicked={backwardButtonClick}
                        nextButtonText="Передать"
                        nextButtonDisabled={requestSent}
                        nextButtonType="submit"
                    />
                </FormBox>} 
            </>}
            {!loadInventory && <FormBox formTitle="Создать и передать предмет" handleSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <ItemFormBaseBody />
                        <Grid item xs={12}>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                disabled={requestSent}
                                value={count}
                                onChange={(e) => onCountChange(e.target.value)} 
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
                            <FormStepsButtons
                                showPrevButton={false}
                                nextButtonText="Передать"
                                nextButtonDisabled={requestSent}
                                nextButtonType="submit"
                            />
                        </Grid>
                    </Grid>
                </FormBox>}
        </ItemFormBaseStateProvider>
    </Container>

}