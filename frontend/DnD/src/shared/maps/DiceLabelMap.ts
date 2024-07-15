import { Dice } from "../api/gql/graphql";

export const labelMap: Map<Dice, string> = new Map([
    [Dice.OneD1, "1к1"],
    [Dice.OneD2, "1к2"],
    [Dice.OneD3, "1к3"],
    [Dice.OneD4, "1к4"],
    [Dice.OneD6, "1к6"],
    [Dice.OneD8, "1к8"],
    [Dice.OneD10, "1к10"],
    [Dice.OneD12, "1к12"],
    [Dice.TwoD6, "2к6"],
    [Dice.TwoD10, "2к10"],
]);