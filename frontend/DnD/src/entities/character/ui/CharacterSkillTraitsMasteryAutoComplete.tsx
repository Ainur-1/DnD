import { Autocomplete, Chip, TextField, useTheme } from "@mui/material";

interface CharacterSkillTraitsMasteryProps {
    availableSkillTraits: string[];
    skillTraitsToChoose: number;
    selectedTraits: string[];
    onChange: (values: string[]) => void;
    isLoading: boolean;
    error?: string;
}

export default function CharacterSkillTraitsMasteryAutoComplete({
    availableSkillTraits, 
    skillTraitsToChoose, 
    onChange, 
    selectedTraits,
    isLoading,
    error,
}: CharacterSkillTraitsMasteryProps) {
    const theme = useTheme();

    const filteredOptions = availableSkillTraits.filter(property =>
        !selectedTraits.includes(property)
    );

    const handlePropertyChange = (_: React.ChangeEvent<{}>, values: string[]) => {
        const uniqueValues = values
        .filter((value, index, self) => (
            self.indexOf(value) === index
        ));
        if (uniqueValues.length <= skillTraitsToChoose)
            onChange(uniqueValues);
    };

    let postfix: string;
    if (skillTraitsToChoose == 1) {
        postfix = "е";
    } else if (skillTraitsToChoose > 1 && skillTraitsToChoose < 4) {
        postfix = "я";
    } else {
        postfix = "й";
    }
    const label = `Выберите ${skillTraitsToChoose} значени${postfix}`;

    return <Autocomplete
        disabled={skillTraitsToChoose >= selectedTraits.length}
        multiple
        id="character-skill-traits-mastery"
        options={filteredOptions}
        value={selectedTraits}
        onChange={handlePropertyChange}
        loading={isLoading}
        renderInput={(params) => (
            <TextField
                {...params}
                error={error != undefined && error.length > 0}
                helperText={error}
                variant="outlined"
                label={label}
            />
        )}
        renderTags={(value, getTagProps) => value.map((option, index) => (
            <Chip variant="filled" label={option} {...getTagProps({ index })} sx={{
            background: theme.palette.secondary.main
            }}
                title={option}
            />
        ))}
    />
}