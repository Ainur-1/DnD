import { TextField, TextFieldVariants } from "@mui/material";

interface CharacterBackgroundFieldProps {
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    variant?: TextFieldVariants;
}

export default function CharacterBackgroundField({disabled = false, value, onChange, label, variant}: CharacterBackgroundFieldProps) {

    return <TextField
        label={label}
        margin="dense"
        disabled={disabled}
        value={value}
        variant={variant}
        onChange={(e) => onChange?.(e.target.value.trimStart())}
        multiline
        fullWidth
        minRows={3}
    />
}