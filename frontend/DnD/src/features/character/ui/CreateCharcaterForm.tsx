import { Box, FormControl, FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { Action, CreateCharacterFormState, initialState, StateKeys, Steps, useCreateCharacterReducer } from "../model/createCharacterFormReducer";
import { CharacterIsPublicSwitch, CoinsAffectWeightSwitch } from "@/entities/character";

interface StepProps {
    state: CreateCharacterFormState,
    setStep: (step: number) => void,
    setField: (key: StateKeys, value: any, error?: string) => void,
}

function Step1({state, setStep, setField}: StepProps) {

    return <>
        <TextField 
            value={state.name.value} 
            onChange={(e) => setField("name", e.target.value.trimStart())} 
            margin="normal" 
            required 
            fullWidth  
            label="Имя персонажа" 
            type="text" 
            autoFocus
            error={state.name.error !== null}
            helperText={state.name.error}
        />
        <FormGroup>
            <CoinsAffectWeightSwitch 
                value={state.coinsAffectWeight.value ?? false} 
                onChange={(value) => setField("coinsAffectWeight", value)} 
            />
            <CharacterIsPublicSwitch 
                value={state.isPublic.value ?? false} 
                onChange={(value) => setField("isPublic", value)}
            />
        </FormGroup>
    </>
}

export default function CreateCharcaterForm() {
    const { state, setField, setStep } = useCreateCharacterReducer();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return <>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            {state.step === 1 && <Step1 state={state} dispatch={dispatch}/>}
        </Box>
    </>
}