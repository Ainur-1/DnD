import { tryParseNumber } from "@/shared/utils/parsers";
import { TextField } from "@mui/material";

interface CharacterAgeProps {
    value: number | undefined;
    onChange: (newValue: number | undefined) => void;
    errorText: string | undefined | null;
    disabled: boolean;
}

export default function AgeField({ value, onChange, errorText, disabled }: CharacterAgeProps) {

    const onChangeInternal = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const strValue = e.target.value.trim();
        const { success, value } = tryParseNumber(strValue);

        if (success) {
            const floored = Math.floor(value!);
            
            onChange(floored < 1 ? 1 : floored);
            return;
        }

        onChange(value);
    };

    return <TextField
        value={value} 
        onChange={onChangeInternal} 
        margin="normal" 
        required 
        fullWidth  
        label="Возраст"
        type="number" 
        error={errorText !== null || errorText != undefined}
        helperText={errorText}
        disabled={disabled}
    />
}