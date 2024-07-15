import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { enumFromStringValue } from '@/shared/utils/enumFromStringParser';
import { SelectorProps } from '@/shared/types/IGenericSelectorProps';
import { CharacterAlignmentType } from '@/shared/api/gql/graphql';
import { labelMap } from '@/shared/maps/AlignmentLabelMap';

interface AlignmentSelectorProps extends SelectorProps<CharacterAlignmentType> {
    errorText?: string
}

export function AlignmentSelector({required, value, onValueChange, errorText}: AlignmentSelectorProps) {
    const values = Object.values(CharacterAlignmentType);

    const handleChange = (value: CharacterAlignmentType | string) => {
        if (typeof value === 'string') {
            const enumValue = enumFromStringValue(CharacterAlignmentType, value);
            if (enumValue)
                onValueChange(enumValue);
        } else {
            onValueChange(value);
        }
    };

    return <FormControl fullWidth required={required} error={errorText != undefined && errorText.length > 0}> 
        <InputLabel id={`alignment-select-label`}>Мировоззрение</InputLabel>
        <Select 
            error={errorText != undefined && errorText.length > 0}
            required={required}
            labelId={`alignment-select-label`}
            id={`alignment-select`}
            value={value}
            label="Мировоззрение"
            onChange={(e) => handleChange(e.target.value)}
        >
            {
                values.map(alignment => <MenuItem key={alignment} value={alignment}>{labelMap.get(alignment)}</MenuItem>)
            }
        </Select>
    </FormControl>
}