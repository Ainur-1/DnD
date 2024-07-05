import { ExpandedInventoryItem, InventoryItem, InventoryWallet } from "@/entities/item/model/types";
import { useInventoryItemsQuery, useUpdateInventoryItemMutation } from "./api/api";

export { useInventoryItemsQuery, useUpdateInventoryItemMutation };

export type {
    InventoryWallet,
    ExpandedInventoryItem, 
    InventoryItem, 
}