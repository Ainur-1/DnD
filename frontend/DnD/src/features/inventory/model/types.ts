import { ExpandedInventoryItem, InventoryItem, InventoryWallet } from "@/entities/item/model/types";

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
    wallet: InventoryWallet;
    weight: number;
    items: ExpandedInventoryItem[];
}