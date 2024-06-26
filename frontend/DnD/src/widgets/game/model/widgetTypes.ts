import { InventoryItem } from "@/entities/item/model/types";
import { ReactChildrenProps } from "@/shared/types/reactChildrenProps";

export interface ButtonProps {
    onClick: () => void,
    disabled?: boolean
}

export interface ButtonPropsWithChildren extends ButtonProps, ReactChildrenProps {

}

export type ItemShortInfo = InventoryItem & {
    title: string,
    iconUrl?: string
}
