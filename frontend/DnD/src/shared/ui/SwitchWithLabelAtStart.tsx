import { FormControlLabel, Switch } from "@mui/material";

interface SwitchWithLabelAtStartProps {
    value: boolean,
    label: string,
    onChange: (newValue: boolean) => void,
}

const SwitchWithLabelAtStart = ({ value, label, onChange }: SwitchWithLabelAtStartProps) => 
<FormControlLabel
    control={<Switch 
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
    />}
    label={label}
    labelPlacement="start"/>

export default SwitchWithLabelAtStart;