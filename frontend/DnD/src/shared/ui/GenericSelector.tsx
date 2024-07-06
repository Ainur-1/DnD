import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SelectorProps } from "../types/IGenericSelectorProps";

interface GenericSelectorProps extends SelectorProps<string> {
    selectorLabel: string,
    id: string,
    values: {
        label: string;
        value: string;
    }[], 
}

export function StringSelector({values, id, required, selectorLabel, value, onValueChange, disabled}: GenericSelectorProps) {

    return <FormControl fullWidth required={required}> 
        <InputLabel id={`${id}-select-label`}>{selectorLabel}</InputLabel>
        <Select 
            required={required}
            labelId={`${id}-select-label`}
            id={`${id}-select`}
            value={value}
            label={selectorLabel}
            onChange={(e)=> onValueChange(e.target.value)}
            disabled={disabled}
        >
            {
                values.map((item, index) => <MenuItem  key={`${id}-${index}`} value={item.value}>{item.label}</MenuItem>)
            }
        </Select>
    </FormControl>
}
