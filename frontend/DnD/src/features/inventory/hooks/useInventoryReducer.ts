import { useAppDispatch, useAppSelector } from "@/shared/redux-type-hooks";
import { setCharacterId as sliceSetCharacterId, 
    setItems as sliceSetItems, 
    setWallet as sliceSetWallet, 
    setWeigth as sliceSetWeight,
    resetState as sliceResetState,
    updateItem as sliceUpdateItem
} from "../model/inventorySlice";
import { ExpandedInventoryItem, InventoryItem } from "@/entities/item/model/types";
import { CharacterWallet } from "@/entities/character/model/types";

export function useInventoryReducer() {
    const dispatch = useAppDispatch();

    const state = useAppSelector(state => state.inventory);

    const items = useAppSelector(state => state.inventory.items);

    const setCharacterId = (characterId: string) => dispatch(sliceSetCharacterId(characterId));
    const setItems = (items: ExpandedInventoryItem[]) => dispatch(sliceSetItems(items));
    const setWallet = (wallet: CharacterWallet) => dispatch(sliceSetWallet(wallet));
    const setWeigth = (weight: number) => dispatch(sliceSetWeight(weight));
    const resetState = () => dispatch(sliceResetState());
    const updateItem = (item: InventoryItem) => dispatch(sliceUpdateItem(item));

    return {
        state,
        items,
        setCharacterId,
        setItems,
        setWallet,
        setWeigth,
        resetState,
        updateItem
    };
}