import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { enumFromStringValue } from '@/shared/utils/enumFromStringParser';
import { SelectorProps } from '@/shared/types/IGenericSelectorProps';
import { Aligments } from '@/shared/types/domainTypes';

const AligmentsLabelMap = {
    [Aligments.lawfulGood]: "Упорядоченно-добрый",
    [Aligments.neutralGood]: "Добрый",
    [Aligments.chaoticGood]: "Хаотично-добрый",
    [Aligments.lawfulNeutral]: "Упорядоченный",
    [Aligments.trueNeutral]: "Истинно нейтральный",
    [Aligments.chaoticNeutral]: "Хаотичный",
    [Aligments.lawfulEvil]: "Упорядоченно-злой",
    [Aligments.neutralEvil]: "Злой",
    [Aligments.chaoticEvil]: "Хаотично-злой",
    [Aligments.unaligned]: "Без привязки",
    [Aligments.any]: "Любое",
}

interface AlignmentSelectorProps extends SelectorProps<Aligments> {
    errorText?: string
}

export function AlignmentSelector({required, value, onValueChange, errorText}: AlignmentSelectorProps) {
    const values = Object.values(Aligments);

    const handleChange = (value: Aligments | string) => {
        if (typeof value === 'string') {
            const enumValue = enumFromStringValue(Aligments, value);
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
                values.map(alignment => <MenuItem key={alignment} value={alignment}>{AligmentsLabelMap[alignment]}</MenuItem>)
            }
        </Select>
    </FormControl>
}