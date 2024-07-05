import { tryParseNumber } from "@/shared/utils/parsers";
import { Grid, Stack, TextField, Typography } from "@mui/material";

interface StrictCharacterAbilityProps {
    abilityValue: number | undefined;
    onAbilityValueChange: (value: number | undefined) => void
}

interface CharacterAbilityProps extends StrictCharacterAbilityProps {
    abilityLabel: string;
}

function CharacterAbility({abilityLabel, abilityValue, onAbilityValueChange}: CharacterAbilityProps) {

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const strValue = e.target.value.trim();
        const { success, value } = tryParseNumber(strValue);

        if (success) {
            const floored = Math.floor(value!);
            
            onAbilityValueChange(floored <= 0 ? 1 : floored);
            return;
        }

        onAbilityValueChange(value);
    };

    return <>
        <Grid item xs={8} alignItems="flex-start">
            <Typography component="span" variant="h6">
                {abilityLabel}
            </Typography>
        </Grid>
        <Grid item xs={4}>
            <TextField 
                required
                value={abilityValue}
                onChange={onChange}
                error={abilityValue == undefined}
            />
        </Grid>
    </>
}


interface CharacterAbilitiesProps {
    strength: StrictCharacterAbilityProps;
    dexterity: StrictCharacterAbilityProps;
    constitution: StrictCharacterAbilityProps;
    intelligence: StrictCharacterAbilityProps;
    wisdom: StrictCharacterAbilityProps;
    charisma: StrictCharacterAbilityProps;
}

export default function CharacterAbilities({
    strength, 
    dexterity, 
    constitution, 
    intelligence, 
    wisdom, 
    charisma
}:CharacterAbilitiesProps) {

    return <Stack>
        <Typography variant="h4" component="div" textAlign="start">
            Характеристики
        </Typography>
        <Grid container>
            <CharacterAbility abilityLabel="Сила" abilityValue={strength.abilityValue} onAbilityValueChange={strength.onAbilityValueChange} />
            <CharacterAbility abilityLabel="Ловкость" abilityValue={dexterity.abilityValue} onAbilityValueChange={dexterity.onAbilityValueChange} />
            <CharacterAbility abilityLabel="Телосложение" abilityValue={constitution.abilityValue} onAbilityValueChange={constitution.onAbilityValueChange} />
            <CharacterAbility abilityLabel="Интеллект" abilityValue={intelligence.abilityValue} onAbilityValueChange={intelligence.onAbilityValueChange} />
            <CharacterAbility abilityLabel="Мудрость" abilityValue={wisdom.abilityValue} onAbilityValueChange={wisdom.onAbilityValueChange} />
            <CharacterAbility abilityLabel="Харизма" abilityValue={charisma.abilityValue} onAbilityValueChange={charisma.onAbilityValueChange} />
        </Grid>
    </Stack>
}