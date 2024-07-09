import { CharacterSkillType } from "@/shared/api/gql/graphql";
import { Autocomplete, Chip, TextField, useTheme } from "@mui/material";

const labelMap = {
    [CharacterSkillType.Acrobatics]: "Акробатика",
    [CharacterSkillType.AnimalHanding]: "Уход за животными",
    [CharacterSkillType.Arcana]: "Магия",
    [CharacterSkillType.Athletics]: "Атлетика",
    [CharacterSkillType.Deception]: "Обман",
    [CharacterSkillType.HandSleight]: "Ловкость рук",
    [CharacterSkillType.History]: "История",
    [CharacterSkillType.Insight]: "Проницательность",
    [CharacterSkillType.Intimidation]: "Запугивание",
    [CharacterSkillType.Investigation]: "Анализ",
    [CharacterSkillType.Medicine]: "Медицина",
    [CharacterSkillType.Nature]: "Природа",
    [CharacterSkillType.Perception]: "Внимательность",
    [CharacterSkillType.Performance]: "Выступление",
    [CharacterSkillType.Persuasion]: "Убеждение",
    [CharacterSkillType.Religion]: "Религия",
    [CharacterSkillType.Stealth]: "Скрытность",
    [CharacterSkillType.Survival]: "Выживание",
};

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
        disabled={isLoading}
        multiple
        id="character-skill-traits-mastery"
        options={filteredOptions}
        value={selectedTraits}
        onChange={handlePropertyChange}
        loading={isLoading}
        getOptionLabel={(option) => labelMap[option as CharacterSkillType]}
        renderInput={(params) => (
            <TextField
                {...params}
                required
                error={error != undefined && error.length > 0}
                helperText={error}
                variant="outlined"
                label={label}
            />
        )}
        renderTags={(value, getTagProps) => value.map((option, index) => (
            <Chip variant="filled" label={labelMap[option as CharacterSkillType]} {...getTagProps({ index })} sx={{
            background: theme.palette.secondary.main
            }}
                title={labelMap[option as CharacterSkillType]}
            />
        ))}
    />
}