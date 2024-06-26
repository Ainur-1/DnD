import InventoryItemCard from "@/entities/item/ui/inventoryItem";
import { IconButton, List, ListItem, Paper, Skeleton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useInventoryItemsQuery, useUpdateInventoryItemMutation } from "@/features/inventory";

interface EquippedItemsListProps {
    characterId: string
}

export default function EquippedItemsList({characterId}: EquippedItemsListProps) {

    const { data, isLoading: queryIsLoading } = useInventoryItemsQuery({
        characterId
    });

    const [updateInventoryItem, { isLoading: mutationIsLoading }] = useUpdateInventoryItemMutation();

    async function onUnUseButtonClick(itemId: string) {
        if (mutationIsLoading || !data) {
            return;
        }

        const foundItem = data.items.find(x => x.id === itemId);
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
    }

    return <Paper style={{height: 200, overflow: 'auto'}}>
        { (queryIsLoading || !data || data.items.length == 0) && <Skeleton animation="wave" variant="rounded" width="auto" height="100%"/>}
        {
            data && data.items.length > 0 &&
            <List>
                {data.items
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