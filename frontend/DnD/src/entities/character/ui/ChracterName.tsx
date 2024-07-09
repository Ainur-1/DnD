import { TextField } from "@mui/material";

interface CharacterNameProps {
    value: string | undefined;
    onChange: (newValue: string) => void;
    errorText: string | undefined | null;
}

export default function CharacterNameField({ value, onChange, errorText }: CharacterNameProps) {

    return <TextField 
        value={value} 
        onChange={(e) => onChange(e.target.value.trimStart())} 
        margin="normal" 
        fullWidth  
        label="Имя персонажа"
        type="text" 
        autoFocus
        error={errorText !== null || errorText != undefined}
        helperText={errorText}
    />
}