import { WeaponProperty } from "../api/gql/graphql";

export const labelMap = {
    [WeaponProperty.Ammunition]: "Боеприпас",
    [WeaponProperty.Finesse]: "Фехтовальное",
    [WeaponProperty.Loading]: "Перезарядка",
    [WeaponProperty.Range]: "Дальнобойное",
    [WeaponProperty.Reach]: "Досягаемость",
    [WeaponProperty.Special]: "Особое",
    [WeaponProperty.Thrown]: "Метательное",
    [WeaponProperty.Light]: "Лёгкое",
    [WeaponProperty.Heavy]: "Тяжёлое",
    [WeaponProperty.Versatile]: "Универсальное",
    [WeaponProperty.TwoHanded]: "Двуручное",
};
