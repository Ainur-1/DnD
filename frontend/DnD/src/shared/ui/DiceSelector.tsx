import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Dice } from "../types/domainTypes";
import { GenericSelectorProps } from "../types/IGenericSelectorProps";

interface DiceSelectorProps extends GenericSelectorProps<Dice> {
    selectorLabel: string,
    id: string,
}

export function DiceSelector({id, required, selectorLabel, value, onValueChange}: DiceSelectorProps) {
    const values = Object.values(Dice);

    const handleChange = (value: Dice | string) => {
        if (typeof value === 'string') {
            console.log(`Got value in select ${value}.`);
            throw new Error("Unexpected value in enum selector.");
        }

        onValueChange(value);
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
                values.map(dice => <MenuItem value={dice}>{dice}</MenuItem>)
            }
        </Select>
    </FormControl>
}
