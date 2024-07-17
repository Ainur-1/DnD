import {  RaceTrait } from "@/entities/races";
import { tryParseNumber } from "@/shared/utils/parsers";
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";

interface RaceTraitsAdjustmentFormProps {
    raceTrait: RaceTrait;
    onOptionIndexChange: (index: number | undefined) => void;
    selectedOption: number | undefined;
}

export default function RaceTraitAdjustmentForm({ raceTrait, onOptionIndexChange, selectedOption }: RaceTraitsAdjustmentFormProps) {
    const optionsCount = raceTrait.options!.length;

    if (!raceTrait.options) {
        throw Error("No options provided!");
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changed = e.target.value.trim();
        const {success, value} = tryParseNumber(changed);
        if (success && value! < optionsCount) {
            onOptionIndexChange(value!);
        } else {
            onOptionIndexChange(undefined);
        }
    }

    return <>
            <Grid item xs={8}>
                <Typography variant="h6" component="div" fontWeight="bold">
                    {raceTrait.name}
                </Typography>
                <Typography>
                    {raceTrait.description}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <FormControl>
                    <RadioGroup
                        aria-labelledby={`${raceTrait.name}-controlled-radio-buttons-group`}
                        name={`${raceTrait.name}-controlled-radio-buttons-group`}
                        value={selectedOption ?? optionsCount}
                        onChange={onChange}
                    >
                        {raceTrait.options!.map((option, index) => <FormControlLabel key={index} value={index} control={<Radio />} label={option} />)}
                        <FormControlLabel value={optionsCount} control={<Radio />} label="Ничего" />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </>
}
