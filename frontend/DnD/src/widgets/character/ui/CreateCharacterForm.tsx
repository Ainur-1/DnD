import { Box, Button, CircularProgress, FormControl, FormGroup, Grid, List, ListItem, Stack, Typography } from "@mui/material";
import { AgeField, CharacterAbilities, CharacterIsPublicSwitch, CharacterNameField, CharacterUploadImage, CharacterXpField, CoinsAffectWeightSwitch, SpeedField } from "@/entities/character";
import { FormStepsButtons } from "@/shared/ui/FormStepsButtons";
import { useEffect, useState } from "react";
import { CreateCharacterFormState, StateKeys, Steps, useCreateCharacterReducer } from "../model/createCharacterFormReducer";
import { RaceSelector, useRaceInfoQuery } from "@/features/races";
import { ClassSelector, useClassStartInventoryDescriptionQuery } from "@/features/classes";
import CharacterBackgroundField from "@/entities/character/ui/CharacterBackgroundField";
import TagInput from "@/shared/ui/TagInput";
import SkillTraitMasteryField from "./SkillTraitMasteryField";
import RaceTraitAdjustment from "./RaceTraitsAdjustments";
import { ExpandedInventoryItem } from "@/features/inventory";
import AddItemInventoryDialog from "./AddItemInventoryDialog";
import { InventoryWeight } from "@/entities/item";
import InventoryList from "@/entities/item/ui/InventoryList";
import { AlignmentSelector } from "@/entities/character/ui/AlignmentSelector";
import { Currency } from "@/shared/types/domainTypes";
import { useCreateCharacterMutation } from "@/features/character";
import { useNavigate } from "react-router-dom";
import { InventoryCurrencies } from "@/entities/inventory";
import { CharacterAlignmentType, ClassType, RaceType } from "@/shared/api/gql/graphql";
import { stateToVariables } from "../model/utils";

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
            abilityValue: state.strength.value,
            onAbilityValueChange: (value: number | undefined) => setField("strength", value)
        },
        dexterity:  {
            abilityValue: state.dexterity.value,
            onAbilityValueChange: (value: number | undefined) => setField("dexterity", value)
        },
        constitution:  {
            abilityValue: state.constitution.value,
            onAbilityValueChange: (value: number | undefined) => setField("constitution", value)
        },
        intelligence:  {
            abilityValue: state.intelligence.value,
            onAbilityValueChange: (value: number | undefined) => setField("intelligence", value)
        },
        wisdom:  {
            abilityValue: state.wisdom.value,
            onAbilityValueChange: (value: number | undefined) => setField("wisdom", value)
        },
        charisma: {
            abilityValue: state.charisma.value,
            onAbilityValueChange: (value: number | undefined) => setField("charisma", value)
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

        if (raceTraitsAdjustments != undefined && traitName in raceTraitsAdjustments)
            return raceTraitsAdjustments[traitName];

        return undefined;
    }

    return <Stack>
        <Grid container rowSpacing={1} spacing={2}>
                <RaceSelector value={state.race.value} onRaceSelected={(race) => setField("race", race)} />
                {state.race.value && <Grid item xs={12}>
                    <RaceTraitAdjustment 
                        race={state.race.value} 
                        setSelectedOption={setSelectedRaceTraitOption} 
                        getSelectedOption={getSelectedRaceTraitOption} />
                </Grid>}
                <Grid item xs={6} md={6}>
                    <ClassSelector value={state.classId.value} onClassSelected={(value) => setField("classId", value)} />
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
                        error={state.skillTraitsMastery.error ?? undefined}
                    />
                </Grid>
        </Grid>
        <CharacterAbilities {...characterAbilitiesProps} />
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
    if (!state.race.value?.id) {
        throw new Error("Race required!");
    }

    const { data, isSuccess, isFetching } = useRaceInfoQuery({raceId: state.race.value.id as RaceType});

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

    const onAligmentChange = (alignment: CharacterAlignmentType) => {
        if (alignment != CharacterAlignmentType.Any)
            setField("alignment", alignment);
    };

    useEffect(() => {
        if (isSuccess) {
            const raceInfo = data.raceInfo;
            const defaultLanguages = raceInfo.languages;
            const defaultAge = raceInfo.adultAge;
            const defaultSpeed = raceInfo.speed;
            setField("languages", defaultLanguages);
            setField("age", defaultAge);
            setField("speed", defaultSpeed);
        }
    }, [data, isSuccess]);

    return <Stack>
        <Grid container rowSpacing={1} spacing={2}>
            <Grid item xs={12} alignItems="center">
                <CharacterUploadImage base64Image={state.base64Image.value} setImage={(base64Iamge) => setField("base64Image", base64Iamge)}/>
            </Grid>
            <Grid item xs={6} marginTop={3}>
                <AgeField 
                    value={state.age.value}
                    onChange={(value) => setField("age", value)}
                    disabled={isFetching}
                    errorText={state.age.error}
                />
            </Grid>
            <Grid item xs={6} marginTop={3}>
                <SpeedField 
                    value={state.speed.value}
                    onChange={(value) => setField("speed", value)}
                    disabled={isFetching}
                    errorText={state.speed.error}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" width="100%" color="GrayText" textAlign="justify" marginBottom={1}>
                    {data?.raceInfo?.recommendedAlignmentDescription}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <AlignmentSelector required={true} value={state.alignment.value} errorText={state.alignment.error ?? undefined} onValueChange={onAligmentChange}/>
            </Grid>
            <Grid item xs={12}>
                <CharacterBackgroundField
                    label="Лор"
                    value={state.background.value}
                    onChange={(value) => setField("background", value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TagInput 
                    inputPlaceHolder="Языки"
                    tags={state.languages.value ?? []}
                    setTags={(tags) => setField("languages", tags)}   
                />
            </Grid>
            <Grid item xs={12}>
                <TagInput 
                    inputPlaceHolder="Слабости"
                    tags={state.flaws.value ?? []}
                    setTags={(tags) => setField("flaws", tags)}   
                />
            </Grid>
            <Grid item xs={12}>
                <TagInput 
                    inputPlaceHolder="Привязанности"
                    tags={state.bonds.value ?? []}
                    setTags={(tags) => setField("bonds", tags)}   
                />
            </Grid>
            <Grid item xs={12}>
                <TagInput 
                    inputPlaceHolder="Прочие черты"
                    tags={state.otherTraits.value ?? []}
                    setTags={(tags) => setField("otherTraits", tags)}   
                />
            </Grid>
        </Grid>
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

function Step4({ state, setStep, setField, disable, submit, isValid }: StepProps & {disable: boolean, submit: () => void}) {
    const [show, setShow] = useState(false);

    const [disableButtons] = useState(false);
    if (!state.classId.value) {
        throw new Error("No class was set!");
    }

    const { data, isFetching, isSuccess } = useClassStartInventoryDescriptionQuery({id: state.classId.value! as ClassType});

    const showForm = () => setShow(true);
    const closeForm = () => setShow(false);

    const setCurrency = (currency: Currency, value: number | undefined) => {
        const wallet = state.currency?.value;
        if (!wallet) {
            return;
        }

        setField("currency", {
            ...wallet,
            [currency]: value
        });
    };

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

    const onNextButtonClicked = () => {
        if (isValid()){
            submit();
        }
    };

    return <Stack>
        <Stack>
            <Typography variant="h5" fontWeight="bold" component="div" textAlign="center">
                Стартовый инветарь
            </Typography>
            <Box display="flex" justifyContent="center" marginTop={3}>
                <InventoryCurrencies 
                    setCurrency={setCurrency}
                    gold={state.currency.value?.gold} 
                    silver={state.currency.value?.silver} 
                    electrum={state.currency.value?.electrum} 
                    platinum={state.currency.value?.platinum} 
                    copper={state.currency.value?.copper} 
                />
            </Box>
            <Typography variant="body1" color="GrayText" component="div" marginTop={5}>
                {isFetching && <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>}
                {isSuccess && <Stack>
                    <Typography fontWeight="bold" variant="body1" textAlign="center">
                        Вы можете выбрать начальные предметы:
                    </Typography>
                    <List>
                        {data.classInfo.startInventoryDescription.split('\n').map(description => 
                            <ListItem key={description}>
                                <Typography variant="body2">
                                    {description}
                                </Typography>
                            </ListItem>
                        )}
                    </List>
                </Stack>}
            </Typography>
            <InventoryList
                items={state.inventory.value!}
                maxHeight="50vh"
                deleteItem={deleteItem}
                changeItem={changeItem}
            />
            <InventoryWeight 
                weightInPounds={state.inventory.value!
                    .map(x => x.item.weightInPounds)
                    .reduce((sum, current) => sum + current, 0)
                    + ((!state.coinsAffectWeight.value || state.currency.value == undefined) ? 0 
                        : ((state.currency.value?.copper ?? 0) + (state.currency.value?.silver ?? 0) + (state.currency.value?.gold ?? 0) + (state.currency.value?.electrum ?? 0) + (state.currency.value?.platinum ?? 0)) / 50.0)
                }
            />
            <Button variant="outlined" onClick={showForm}>Добавить</Button>
            <AddItemInventoryDialog 
                show={show} 
                close={closeForm}
                onItemAdd={addItem}
            />
        </Stack>
        <Typography variant="body1" textAlign="center" component="div" marginTop={1} marginBottom={0} color="error">
                {state.formError}
        </Typography>
        <FormStepsButtons 
            onPrevButtonClicked={() => setStep(3)}
            prevButtonText="Назад"
            nextButtonText="Создать"
            onNextButtonClicked={onNextButtonClicked}
            nextButtonDisabled={disableButtons || disable}
            prevButtonDisabled={disableButtons || disable}
        />
    </Stack>
}

export default function CreateCharacterForm() {
    const { state, 
        setField, 
        setStep,
        setFormError,
        isValidStep1,
        isValidStep2,
        isValidStep3,
        isValidStep4
     } = useCreateCharacterReducer();

    const [createCharacter, {data, isLoading, isSuccess, isError, error}] = useCreateCharacterMutation();
    const navigate = useNavigate();

    async function onSubmit() {
        if (isLoading) {
            setFormError("Запрос уже отправлен.");
            return;
        } else if (state.step != 4) {
            setFormError("Заполните форму.");
            return;
        }

        setFormError();
        await createCharacter(stateToVariables(state));
    }

    useEffect(() => {
        if (isSuccess) {
            navigate(`/my-characters/${data.createCharacter.uuid}`);
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (isError) {
            console.log(error);
            setFormError("Не удалось создать персонажа.");
        }
    }, [isError, data]);

    return <>
        <Box component="form" noValidate padding={2}>
            {state.step === 1 && <Step1 state={state} isValid={isValidStep1} setField={setField} setStep={setStep} />}
            {state.step === 2 && <Step2 state={state} isValid={isValidStep2} setField={setField} setStep={setStep} />}
            {state.step === 3 && <Step3 state={state} isValid={isValidStep3} setField={setField} setStep={setStep} />}
            {state.step === 4 && <Step4 state={state} isValid={isValidStep4} setField={setField} setStep={setStep} 
                                        disable={isLoading} submit={onSubmit}/>}
        </Box>
    </>
}