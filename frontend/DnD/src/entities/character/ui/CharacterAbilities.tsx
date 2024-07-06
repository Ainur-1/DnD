import { tryParseNumber } from "@/shared/utils/parsers";
import { Box, ClickAwayListener, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { useState } from "react";

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
        if (strValue.length == 0) {
            onAbilityValueChange(undefined);
            return;
        }
        const { success, value } = tryParseNumber(strValue);

        if (success) {
            const floored = Math.floor(value!);
            
            onAbilityValueChange(floored <= 0 ? 1 : floored);
            return;
        }

        onAbilityValueChange(value);
    };

    return <>
        <Grid item xs={10}>
            <Typography component="span" variant="h6">
                {abilityLabel}
            </Typography>
        </Grid>
        <Grid item xs={2} >
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

    return <Stack marginTop={2}>
        <Typography variant="h5" fontWeight="bold" component="div" textAlign="center">
            Характеристики
        </Typography>
        <Grid marginTop={1} container padding={2} rowSpacing={1}>
            <CharacterAbility abilityLabel="Сила" abilityValue={strength.abilityValue} onAbilityValueChange={strength.onAbilityValueChange} />
            <CharacterAbility abilityLabel="Ловкость" abilityValue={dexterity.abilityValue} onAbilityValueChange={dexterity.onAbilityValueChange} />
            <CharacterAbility abilityLabel="Телосложение" abilityValue={constitution.abilityValue} onAbilityValueChange={constitution.onAbilityValueChange} />
            <CharacterAbility abilityLabel="Интеллект" abilityValue={intelligence.abilityValue} onAbilityValueChange={intelligence.onAbilityValueChange} />
            <CharacterAbility abilityLabel="Мудрость" abilityValue={wisdom.abilityValue} onAbilityValueChange={wisdom.onAbilityValueChange} />
            <CharacterAbility abilityLabel="Харизма" abilityValue={charisma.abilityValue} onAbilityValueChange={charisma.onAbilityValueChange} />
        </Grid>
        <Box display="flex" justifyContent="flex-end">
            <AbilityToolTip/>
        </Box>
    </Stack>
}

function AbilityToolTip() {
    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => setOpen(false);

    const handleTooltipOpen= () => setOpen(true);

    return <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="Бросьте четыре кости 1d6 и запишите сумму трёх наибольших результатов для каждой карактеристики. Или распределите 15, 14, 13, 12, 10, 8."
      >
        <IconButton onClick={handleTooltipOpen}>
            <HelpOutlinedIcon/>
        </IconButton>
      </Tooltip>
  </ClickAwayListener>
}