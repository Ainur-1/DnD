import { Box, Button, CircularProgress, FormControl, FormGroup, Grid, Stack, Typography } from "@mui/material";
import { CharacterAbilities, CharacterIsPublicSwitch, CharacterNameField, CharacterUploadImage, CharacterXpField, CoinsAffectWeightSwitch } from "@/entities/character";
import { FormStepsButtons } from "@/shared/ui/FormStepsButtons";
import { useState } from "react";
import { CreateCharacterFormState, StateKeys, Steps, useCreateCharacterReducer } from "../model/createCharacterFormReducer";
import { RaceSelector } from "@/features/races";
import { ClassSelector, useClassStartInventoryDescriptionQuery } from "@/features/classes";
import CharacterBackgroundField from "@/entities/character/ui/CharacterBackgroundField";
import TagInput from "@/shared/ui/TagInput";
import SkillTraitMasteryField from "./SkillTraitMasteryField";
import RaceTraitAdjustment from "./RaceTraitsAdjustments";
import { ExpandedInventoryItem } from "@/features/inventory";
import AddItemInventoryDialog from "./AddItemInventoryDialog";
import { InventoryWeight } from "@/entities/item";
import InventoryList from "@/entities/item/ui/InventoryList";

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
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

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

    function setSelectedRaceTraitOption(traitName: string, selectedOption: number | undefined) {
        const raceTraitsAdjustments = state.raceTraitsAdjustments.value!;

        setField("raceTraitsAdjustments", {
            ...raceTraitsAdjustments,
            [traitName]: selectedOption
        });
    }

    function getSelectedRaceTraitOption(traitName: string) {
        const raceTraitsAdjustments = state.raceTraitsAdjustments.value!;

        if (traitName in raceTraitsAdjustments)
            return raceTraitsAdjustments[traitName];

        return undefined;
    }

    return <Stack>
        <Stack alignItems="center">
            <Grid container alignItems="center" justifyContent="center" rowSpacing={1}>
                <RaceSelector onRaceSelected={(race) => setField("race", race)} />
                {state.race.value && <Grid item xs={12}>
                    <RaceTraitAdjustment 
                        race={state.race.value} 
                        setSelectedOption={setSelectedRaceTraitOption} 
                        getSelectedOption={getSelectedRaceTraitOption} />
                </Grid>}
                <Grid item xs={6} md={6}>
                    <ClassSelector onClassSelected={(value) => setField("classId", value)} />
                </Grid>
                <Grid item xs={6} md={6}>
                    <CharacterXpField 
                        errorText={state.classXp.error}
                        value={state.classXp.value}
                        onChange={(val) => setField("classXp", val)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SkillTraitMasteryField 
                        classId={state.classId.value} 
                        selectedTraits={state.skillTraitsMastery.value ?? []} 
                        setSelectedTraits={(values) => setField("skillTraitsMastery", values)}
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


function Step3({ state, setStep, setField, isValid }: StepProps) {
    const [disableButtons, setDisableButtons] = useState(false);

    const onNextButtonClicked = () => {
        setDisableButtons(true);
        try {
            if (isValid()) {
                setStep(4);
            }
        } finally {
            setDisableButtons(false);
        }
    };

    return <Stack>
        <Stack alignItems="center">
            <Box width={200} height={200}>
                <CharacterUploadImage base64Image={state.base64Image.value} setImage={(base64Iamge) => setField("base64Image", base64Iamge)}/>
            </Box>
            <CharacterBackgroundField
                label="Лор"
                value={state.background.value}
                onChange={(value) => setField("background", value)}
            />
            <TagInput 
                inputPlaceHolder="Языки"
                tags={state.languages.value ?? []}
                setTags={(tags) => setField("languages", tags)}   
            />
            <TagInput 
                inputPlaceHolder="Слабости"
                tags={state.flaws.value ?? []}
                setTags={(tags) => setField("flaws", tags)}   
            />
            <TagInput 
                inputPlaceHolder="Привязанности"
                tags={state.bonds.value ?? []}
                setTags={(tags) => setField("bonds", tags)}   
            />
            <TagInput 
                inputPlaceHolder="Прочие черты"
                tags={state.otherTraits.value ?? []}
                setTags={(tags) => setField("otherTraits", tags)}   
            />
        </Stack>
        <FormStepsButtons 
            onPrevButtonClicked={() => setStep(2)}
            prevButtonText="Назад"
            onNextButtonClicked={onNextButtonClicked}
            nextButtonText="Далее"
            nextButtonDisabled={disableButtons}
            prevButtonDisabled={disableButtons}
        />
    </Stack>
}

function Step4({ state, setStep, setField }: StepProps) {
    const [show, setShow] = useState(false);

    const [disableButtons] = useState(false);
    if (!state.classId.value) {
        throw new Error("No class was set!");
    }

    const { data, isFetching, isSuccess } = useClassStartInventoryDescriptionQuery(state.classId.value);

    const showForm = () => setShow(true);
    const closeForm = () => setShow(false);

    const addItem = (item: ExpandedInventoryItem) => setField("inventory", 
        [...state.inventory.value!, item]
    );

    const deleteItem = (delIndex: number) => {
        const inventory = state.inventory.value!;
        if (delIndex < 0 || delIndex > inventory!.length) {
            return;
        }

        setField("inventory", inventory.reduce((acc, item, index) => {
            if (index != delIndex) {
                acc.push(item);
            }

            return acc;
        }, [] as ExpandedInventoryItem[]));
    };

    const changeItem = (index: number, updatedItem:ExpandedInventoryItem) => {
        const inventory = state.inventory.value!;
        if (index < 0 || index > inventory!.length) {
            return;
        }

        setField("inventory", inventory.reduce((acc, item, i) => {
            if (index == i) {
                acc.push(updatedItem);
            } else {
                acc.push(item)
            }

            return acc;
        }, [] as ExpandedInventoryItem[]));
    };

    return <Stack>
        <Stack>
            <Typography variant="h5" fontWeight="bold" component="div" textAlign="center">
                Стартовый инветарь
            </Typography>
            <Typography variant="body1" color="GrayText" component="div" marginTop={5}>
                {isFetching && <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>}
                {isSuccess && <>{data}</>}
            </Typography>
            <InventoryList
                items={state.inventory.value!}
                maxHeight="50vh"
                deleteItem={deleteItem}
                changeItem={changeItem}
            />
            <InventoryWeight weightInPounds={state.inventory.value!
                .map(x => x.item.weightInPounds)
                .reduce((sum, current) => sum + current, 0)}/>  
            <Button variant="outlined" onClick={showForm}>Добавить</Button>
            <AddItemInventoryDialog 
                show={show} 
                close={closeForm}
                onItemAdd={addItem}
            />
        </Stack>
        <FormStepsButtons 
            onPrevButtonClicked={() => setStep(3)}
            prevButtonText="Назад"
            nextButtonType="submit"
            nextButtonText="Создать"
            nextButtonDisabled={disableButtons}
            prevButtonDisabled={disableButtons}
        />
    </Stack>
}

export default function CreateCharcaterForm() {
    const { state, 
        setField, 
        setStep,
        isValidStep1,
        isValidStep2,
        isValidStep4
     } = useCreateCharacterReducer();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    }

    const skipValidation = () => true;

    return <>
        <Box component="form" noValidate onSubmit={handleSubmit} padding={2}>
            {state.step === 1 && <Step1 state={state} isValid={isValidStep1} setField={setField} setStep={setStep} />}
            {state.step === 2 && <Step2 state={state} isValid={isValidStep2} setField={setField} setStep={setStep} />}
            {state.step === 3 && <Step3 state={state} isValid={skipValidation} setField={setField} setStep={setStep} />}
            {state.step === 4 && <Step4 state={state} isValid={isValidStep4} setField={setField} setStep={setStep} />}
        </Box>
    </>
}