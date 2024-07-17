import InventoryItemCard from "@/entities/item/ui/inventoryItem";
import { IconButton, List, ListItem, Paper, Skeleton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { ExpandedInventoryItem, useInventoryItemsQuery, useUpdateInventoryItemMutation } from "@/features/inventory";
import { useEffect, useState } from "react";
import { Item } from "@/entities/item";

interface EquippedItemsListProps {
    characterId: string
}

export default function EquippedItemsList({characterId}: EquippedItemsListProps) {

    const { data, isFetching: queryIsLoading, isError, isSuccess, refetch } = useInventoryItemsQuery({characterId});
    const [items, setItems] = useState<ExpandedInventoryItem[] | undefined>(undefined);

    const [updateInventoryItem, { isLoading: mutationIsLoading }] = useUpdateInventoryItemMutation();

    async function onUnUseButtonClick(itemId: string) {
        /*
        if (mutationIsLoading || !data) {
            return;
        }

        const foundItem = data.characterInventory.find(x => x.id === itemId);
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
        */
    }

    useEffect(() => {
        if (isError) {
            refetch();
        }
    }, [isError, queryIsLoading]);

    useEffect(() => {
        if (isSuccess) {
            setItems(data.characterInventory.items.map(x => {
                let item: Item;

                if (x.item.armor) {
                    const armor = x.item.armor!;
                    item = {
                        name: armor.name,
                        weightInPounds: armor.weightInPounds,
                        description: armor.description ?? undefined,
                        costInGold: armor.costInGold,
                        tags: armor.tags,
                        armorType: armor.armorType,
                        material: armor.material,
                        requiredStrength: armor.requiredStrength ?? undefined,
                        hasStealthDisadvantage: armor.hasStealthDisadvantage,
                        maxPossibleDexterityModifier: armor.maxPossibleDexterityModifier ?? undefined,
                        armorClass: armor.baseArmorClass,
                    };
                } else if (x.item.stuff) {
                    const stuff = x.item.stuff!
                    item = {
                        name: stuff.name,
                        weightInPounds: stuff.weightInPounds,
                        description: stuff.description ?? undefined,
                        costInGold: stuff.costInGold,
                        tags: stuff.tags,
                    };
                } else if (x.item.weapon) {
                    const weapon = x.item.weapon!;
                    item = {
                        name: weapon.name,
                        weightInPounds: weapon.weightInPounds,
                        description: weapon.description ?? undefined,
                        costInGold: weapon.costInGold,
                        tags: weapon.tags,
                        attackType: weapon.attackType,
                        proficiencyType: weapon.proficiencyType,
                        damageType: weapon.damageType,
                        normalDistanceInFoots: weapon.normalDistanceInFoots ?? undefined,
                        criticalDistanceInFoots: weapon.criticalDistanceInFoots ?? undefined,
                        properties: weapon.properties ?? undefined,
                        hitDice: weapon.hitDice,
                        alternateHitDice: weapon.alternateHitDice ?? undefined
                    };
                } else {
                    throw new Error();
                }

                return {
                    count: x.count,
                    id: x.id,
                    inUse: x.inUse,
                    isItemProficiencyOn: x.isItemProficiencyOn,
                    item: item
                };
            }));
        }
    }, [isSuccess, data]);

    return <Paper style={{height: 200, overflow: 'auto'}}>
        { (queryIsLoading || !items || items.length == 0) && <Skeleton animation="wave" variant="rounded" width="auto" height="100%"/>}
        {
            items && items.length > 0 &&
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