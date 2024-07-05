import { TextField } from "@mui/material";

interface CharacterBackgroundFieldProps {
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
}

export default function CharacterBackgroundField({disabled = false, value, onChange, label}: CharacterBackgroundFieldProps) {

    return <TextField
        label={label}
        disabled={disabled}
        value={value}
        variant="filled"
        onChange={(e) => onChange?.(e.target.value.trimStart())}
        multiline
    />
}