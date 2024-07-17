import { tryParseNumber } from "@/shared/utils/parsers";
import { TextField } from "@mui/material";

interface CharacterNameProps {
    value: number | undefined;
    onChange: (newValue: number | undefined) => void;
    errorText: string | undefined | null;
}

export default function CharacterXpField({ value, onChange, errorText }: CharacterNameProps) {

    const onChangeInternal = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const strValue = e.target.value.trim();
        const { success, value } = tryParseNumber(strValue);

        if (success) {
            const floored = Math.floor(value!);
            
            onChange(floored < 0 ? 0 : floored);
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
        label="Опыт (xp)"
        type="number" 
        error={errorText !== null || errorText != undefined}
        helperText={errorText}
    />
}