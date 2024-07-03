import { CharacterWallet } from "@/entities/character/model/types";
import { ExpandedInventoryItem, InventoryItem, } from "@/entities/item/model/types";

export interface InventoryItemsQueryResult  {
    items: ExpandedInventoryItem[];
}

export interface InventoryItemsQueryVariables {
    characterId: string;
}

export interface UpdateInventoryItemMutationVariables {
    delete: boolean,
    item: InventoryItem 
}

export interface UpdateInventoryItemMutationResult {
}

export type InventoryState = {
    characterId: string | null;
    wallet: CharacterWallet;
    weight: number;
    items: ExpandedInventoryItem[];
}