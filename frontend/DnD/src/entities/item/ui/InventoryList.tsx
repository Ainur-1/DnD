import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Chip, FormControl, FormControlLabel, FormGroup, List, ListItem, Switch, TextField, Typography } from "@mui/material";
import { ExpandedInventoryItem } from "../model/types";
import InventoryItemCard from "./inventoryItem";
import { useState } from "react";
import { tryParseNumber } from "@/shared/utils/parsers";


interface InventoryItemProps {
    item: ExpandedInventoryItem;
    deleteItem: () => void;
    changeCount: (value: number) => void;
    changeUsage: (inUse: boolean) => void;
    changeProficiency: (proficiencyOn: boolean) => void;
}

function InventoryItem({item, deleteItem, changeCount, changeUsage, changeProficiency}: InventoryItemProps) {

    const [count, setCount] = useState<number | undefined>(item.count);

    const onCountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const strValue = e.target.value.trim();
        const { success, value } = tryParseNumber(strValue);
        if (success) {
            const floor = Math.floor(value!);
            const setValue = floor < 1 ? 1 : value!;
            setCount(setValue);
            changeCount(setValue);
        } else {
            setCount(undefined);
        }
    };

    return <Accordion>
        <AccordionSummary>
            <Box display="flex" justifyContent="space-between" alignContent="flex-start" padding={1}>
                <InventoryItemCard cardHeight={64} count={item.count} title={item.item.name}/>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        <FormControlLabel 
                            control={<Switch 
                                checked={item.inUse} 
                                onChange={(e) => changeUsage(e.target.checked)}
                                color="secondary"
                                />} 
                            label="Снарядить"
                            labelPlacement="start"
                        />
                        <FormControlLabel 
                            control={<Switch 
                                checked={item.isItemProficiencyOn} 
                                onChange={(e) => changeProficiency(e.target.checked)} 
                                color="secondary"
                                />} 
                            label="Владение предметом"
                            labelPlacement="start"
                        />
                    </FormGroup>
                </FormControl>
            </Box>
        </AccordionSummary>
        <AccordionDetails>
            <Typography variant="body1" component="div" textAlign="start">
                {item.item.description}
            </Typography>
            <Typography variant="body2" component="div" textAlign="start">Вес: {item.item.weightInPounds} фунт.</Typography>
            <Box display="flex" alignItems="center" justifyContent="flex-start" gap={0.25} overflow="clip">
                {item.item.tags?.map((x, index) => <Chip key={`tag-${index}`} label={x}/>)}
            </Box>
        </AccordionDetails>
        <AccordionActions>
            <Button color="error" onClick={deleteItem}>
                Выбросить
            </Button>
            <TextField
                label="Кол-во"
                value={count}
                onChange={onCountChange}
                error={count == undefined || count < 1}
                type="number"
            />
        </AccordionActions>
    </Accordion>
}

interface InventoryListProps {
    maxHeight?: number | string;
    items: ExpandedInventoryItem[];
    changeItem: (index: number, newItem: ExpandedInventoryItem) => void;
    deleteItem: (index: number) => void;
}

export default function InventoryList({maxHeight, items, changeItem, deleteItem}: InventoryListProps) {

    const changeUsage = (index: number, value: boolean) => {
        const old = items[index];

        changeItem(index, {
            ...old,
            inUse: value
        });
    };

    const changeProficiency = (index: number, value: boolean) => {
        const old = items[index];

        changeItem(index, {
            ...old,
            isItemProficiencyOn: value
        });
    };

    const changeCount = (index: number, value: number) => {
        const old = items[index];

        changeItem(index, {
            ...old,
            count: value
        });
    };

    return <Box maxHeight={maxHeight} overflow={maxHeight ? "scroll" : "auto"}>
        <List>
            {items.map((item, index) => <ListItem key={item.id ?? index}>
                <InventoryItem 
                    changeCount={(count) => changeCount(index, count)}
                    changeProficiency={(checked) => changeProficiency(index, checked)}
                    changeUsage={(checked) => changeUsage(index, checked)}
                    deleteItem={() => deleteItem(index)}
                    item={item}
                />
            </ListItem>)}
        </List>
    </Box>
}