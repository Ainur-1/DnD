import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Dice } from "../types/domainTypes";
import { GenericSelectorProps } from "../types/IGenericSelectorProps";
import { enumFromStringValue } from "../utils/enumFromStringParser";

interface DiceSelectorProps extends GenericSelectorProps<Dice> {
    selectorLabel: string,
    id: string,
}

export function DiceSelector({id, required, selectorLabel, value, onValueChange}: DiceSelectorProps) {
    const values = Object.values(Dice);

    const handleChange = (value: Dice | string) => {
        if (typeof value === 'string') {
            const diceEnumValue = enumFromStringValue(Dice, value);
            if (diceEnumValue)
                onValueChange(diceEnumValue);
        } else {
            onValueChange(value);
        }
    };

    return <FormControl fullWidth required={required}> 
        <InputLabel id={`dice${id}-select-label`}>{selectorLabel}</InputLabel>
        <Select 
            required={required}
            labelId={`dice${id}-select-label`}
            id={`dice${id}-select`}
            value={value}
            label={selectorLabel}
            onChange={(e) => handleChange(e.target.value)}
        >
            {
                values.map(dice => <MenuItem key={dice} value={dice}>{dice}</MenuItem>)
            }
        </Select>
    </FormControl>
}
