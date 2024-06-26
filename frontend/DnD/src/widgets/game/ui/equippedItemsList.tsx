import InventoryItemCard from "@/entities/item/ui/inventoryItem";
import { IconButton, List, ListItem, Paper, Skeleton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from "react";
import { useInventoryItemsQuery, useInventoryReducer, useUpdateInventoryItemMutation } from "@/features/inventory";
import { setCharacterId } from "@/features/inventory/model/inventorySlice";

interface EquippedItemsListProps {
    characterId: string
}

export default function EquippedItemsList({characterId}: EquippedItemsListProps) {

    const { data, isLoading: queryIsLoading  } = useInventoryItemsQuery({
        characterId
    });

    const [updateInventoryItem, { isLoading: mutationIsLoading, isSuccess }] = useUpdateInventoryItemMutation();

    const { items, setItems, resetState, updateItem } = useInventoryReducer();

    async function onUnUseButtonClick(itemId: string) {
        if (mutationIsLoading) {
            return;
        }

        const foundItem = items.find(x => x.id === itemId);
        if (foundItem == undefined) {
            return;
        }

        const updatedItem = {
            count: foundItem.count,
            id: itemId,
            inUse: false,
            isItemProficiencyOn: foundItem.isItemProficiencyOn,
        };

        await updateInventoryItem({
            delete: false,
            item: updatedItem
        });

        if (isSuccess) {
            updateItem(updatedItem);
        }
    }

    useEffect(() => {
        if (data?.items) {
            setItems(data?.items);
        }
    }, [data]);

    useEffect(() => {
        resetState();
        setCharacterId(characterId);
    }, []);

    return <Paper style={{height: 200, overflow: 'auto'}}>
        { (queryIsLoading || items.length == 0) && <Skeleton animation="wave" variant="rounded" width="auto" height="100%"/>}
        {
            items.length > 0 &&
            <List>
                {items
                    .filter(item => item.inUse)
                    .map(item => <ListItem key={item.id}>
                    <InventoryItemCard 
                        title={item.item.name} 
                        iconUrl={item.item.iconUrl} 
                        count={item.count} 
                        cardHeight={64} />
                    <IconButton disabled={mutationIsLoading} onClick={() => onUnUseButtonClick(item.id)}>
                        <ClearIcon />
                    </IconButton>
                </ListItem>
                )}
            </List>
        }
    </Paper>
}