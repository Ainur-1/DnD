import {  RaceTrait } from "@/entities/races";
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";

interface RaceTraitsAdjustmentFormProps {
    raceTrait: RaceTrait;
    selectedOption: string | undefined;
    onOptionChange: (option: string | undefined) => void;
}

export default function RaceTraitAdjustmentForm({ raceTrait, selectedOption, onOptionChange }: RaceTraitsAdjustmentFormProps) {

    if (!raceTrait.options) {
        throw Error("No options provided!");
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changed = e.target.value.trim();
        const value = changed.length > 0 ? changed : undefined;
        onOptionChange(value);
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
                        value={selectedOption}
                        onChange={onChange}
                    >
                        {raceTrait.options!.map((option, index) => <FormControlLabel key={index} value={index} control={<Radio />} label={option} />)}
                        <FormControlLabel value="" control={<Radio />} label="Ничего" />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </>
}
