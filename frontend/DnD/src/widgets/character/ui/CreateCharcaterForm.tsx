import { Box, FormControl, FormGroup, Grid, Stack } from "@mui/material";
import { CharacterAbilities, CharacterIsPublicSwitch, CharacterNameField, CharacterXpField, CoinsAffectWeightSwitch } from "@/entities/character";
import { FormStepsButtons } from "@/shared/ui/FormStepsButtons";
import { useState } from "react";
import { CreateCharacterFormState, StateKeys, Steps, useCreateCharacterReducer } from "../model/createCharacterFormReducer";
import { StringSelector } from "@/shared/ui/GenericSelector";
import { useLazyRaceInfoQuery, useStrictRacesQuery } from "@/features/races";
import { RaceInfo, SimpleRace } from "@/entities/races/model/type";
import { error } from "console";
import { useStrictClassesQuery } from "@/features/classes/api/api";
import { SimpleClass } from "@/entities/classes";

const mapRaceToSelect = (data: SimpleRace[]) => data.map(x => {
    return {
        label: x.name,
        value: x.id
    };
});

const mapClassToSelect = (data: SimpleClass[]) => data.map(x => {
    return {
        label: x.name,
        value: x.name
    };
});

interface StepProps {
    state: CreateCharacterFormState,
    setStep: (step: Steps) => void,
    setField: (key: StateKeys, value: any, error?: string) => void,
    isValid: () => boolean,
}

function Step1({ state, setStep, setField, isValid }: StepProps) {
    const [disableButton, setDisableButton] = useState(false);

    const onNextStepClicked = () => {
        setDisableButton(true);
        try {
            if(isValid()) {
                setStep(2);
            }
        } finally {
            setDisableButton(false);
        }
    }

    return <Stack paddingTop={10}>
        <Stack alignItems="center">
            <CharacterNameField 
                value={state.name.value}
                onChange={(value) => setField("name", value)}
                errorText={state.name.error}
            />
            <FormGroup>
                <CoinsAffectWeightSwitch 
                    value={state.coinsAffectWeight.value!} 
                    onChange={(value) => setField("coinsAffectWeight", value)} 
                />
                <CharacterIsPublicSwitch 
                    value={state.isPublic.value!} 
                    onChange={(value) => setField("isPublic", value)}
                />
            </FormGroup>
        </Stack>
        <FormControl margin="normal">
            <FormStepsButtons
                showPrevButton={false}
                nextButtonText="Далее"
                nextButtonDisabled={disableButton}
                onNextButtonClicked={onNextStepClicked}
            />
        </FormControl>
    </Stack>
}

function Step2({ state, setStep, setField, isValid }: StepProps) {
    const [raceInfo] = useLazyRaceInfoQuery();
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const { data: strictRaces } = useStrictRacesQuery();
    const { data: strictClasses } = useStrictClassesQuery();

    const [tempRace, setTempRace] = useState<RaceInfo | undefined>();
    const [raceDisabled, setRaceDisabled] = useState(false);

    const onRaceSelect = async (id: string) => {
        setRaceDisabled(true);
        setTempRace(undefined);
        try {
            const response = await raceInfo(id);
            if (response.isSuccess && response.data.success) {
                const info = response.data.data;
                if (info?.subraces) {
                    setTempRace(info);
                } else {
                    const race = {
                        id,
                        name: info?.name,
                    };
                    setField("race", race);
                }
            } else {
                //todo: handle errors
                console.log("Fatal error. No connection or whatever.");
                setTempRace(undefined);
                setField("race", undefined, "Ошибка при загурзке.");
            }
        } finally {
            setRaceDisabled(false);
        }
    };

    const onSubraceSelect = (subrace: string) => {
        if (!tempRace) {
            console.log("Temp race was not loaded, but subrace was selected. How?");
            return;
        }
        setField("race", {
            id: tempRace.id,
            name: tempRace.name,
            subrace
        });
    };

    const onClassSelect = (classId: string) => {
        setField("classId", classId);
    }

    const characterAbilitiesProps = {
        strength: {
            abilityValue: 0,
            onAbilityValueChange: (_: number | undefined) => {}
        },
        dexterity:  {
            abilityValue: 0,
            onAbilityValueChange: (_: number | undefined) => {}
        },
        constitution:  {
            abilityValue: 0,
            onAbilityValueChange: (_: number | undefined) => {}
        },
        intelligence:  {
            abilityValue: 0,
            onAbilityValueChange: (_: number | undefined) => {}
        },
        wisdom:  {
            abilityValue: 0,
            onAbilityValueChange: (_: number | undefined) => {}
        },
        charisma: {
            abilityValue: 0,
            onAbilityValueChange: (_: number | undefined) => {}
        },
    };

    const onNextButtonClicked = () => {
        setButtonsDisabled(true);
        try{
            if(isValid()) {
                setStep(3);
            }
        } finally {
            setButtonsDisabled(false);
        }
    };

    return <Stack>
        <Stack alignItems="center">
            <Grid container>
                <Grid item mx={6}>
                    <StringSelector
                        disabled={raceDisabled} 
                        selectorLabel="Раса" 
                        id="race" 
                        values={strictRaces?.data ? [] : mapRaceToSelect(strictRaces!.data!) } 
                        onValueChange={onRaceSelect} />
                </Grid>
                <Grid item mx={6}>
                    { tempRace && <StringSelector 
                            selectorLabel="Подраса" 
                            id="subrace" 
                            values={tempRace.subraces.map(x => {
                                return {
                                    label: x,
                                    value: x
                                };
                            })} 
                            onValueChange={onSubraceSelect} />
                    }
                </Grid>
                <Grid item mx={6}>
                    <StringSelector 
                        selectorLabel="Класс" 
                        id="class" 
                        values={strictClasses?.data ? [] : mapClassToSelect(strictRaces!.data!)}  
                        onValueChange={onClassSelect}
                    />
                </Grid>
                <Grid item mx={6}>
                    <CharacterXpField 
                        errorText={state.classXp.error}
                        value={state.classXp.value}
                        onChange={(val) => setField("classXp", val)}
                    />
                </Grid>
            </Grid>
            <CharacterAbilities {...characterAbilitiesProps} />
        </Stack>
        <FormStepsButtons 
            onPrevButtonClicked={() => setStep(1)}
            prevButtonText="Назад"
            onNextButtonClicked={onNextButtonClicked}
            nextButtonText="Далее"
            nextButtonDisabled={buttonsDisabled}
            prevButtonDisabled={buttonsDisabled}
        />
    </Stack>
}

export default function CreateCharcaterForm() {
    const { state, 
        setField, 
        setStep,
        isValidStep1,
        isValidStep2
     } = useCreateCharacterReducer();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    return <>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            {state.step === 1 && <Step1 state={state} isValid={isValidStep1} setField={setField} setStep={setStep} />}
            {state.step === 2 && <Step2 state={state} isValid={isValidStep2} setField={setField} setStep={setStep} />}
        </Box>
    </>
}