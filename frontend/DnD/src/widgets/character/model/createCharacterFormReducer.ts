import { ClassIdType } from "@/entities/classes";
import { Race } from "@/entities/races";
import { ExpandedInventoryItem, InventoryItem } from "@/features/inventory";
import { FormField } from "@/shared/types/IFormField";
import { useReducer } from "react";

const fullyUndefined = {
    value: undefined,
    error: null
};

export type Steps = 1 | 2 | 3 | 4 ;

type Step1State = {
    name: FormField<string>;
    isPublic: FormField<boolean>;
    coinsAffectWeight: FormField<boolean>;
};

const setp1Init: Step1State = {
    name: fullyUndefined,
    isPublic: {
        value: true,
        error: null
    },
    coinsAffectWeight: {
        value: false,
        error: null
    }
};

type Step2State = {
    race: FormField<Race>;
    raceTraitsAdjustments: FormField<{
        [name: string]: number
    }>;
    classId: FormField<ClassIdType>;
    skillTraitsMastery: FormField<string[]>;
    classXp: FormField<number>;
};

const step2Init: Step2State = {
    race: fullyUndefined,
    raceTraitsAdjustments: fullyUndefined,
    classId: fullyUndefined,
    skillTraitsMastery: fullyUndefined,
    classXp: fullyUndefined,
};

type Step3State = {
    base64Image: FormField<string>,
    age: FormField<number>,
    speed: FormField<number>,
    alignment: FormField<string>,
    background: FormField<string>,
    languages: FormField<string[]>,
    flaws: FormField<string[]>,
    bonds: FormField<string[]>,
    otherTraits: FormField<string[]> 
}

const step3Init: Step3State = {
    base64Image: fullyUndefined,
    age: fullyUndefined,
    speed: fullyUndefined,
    alignment: fullyUndefined,
    background: fullyUndefined,
    languages: fullyUndefined,
    flaws: fullyUndefined,
    bonds: fullyUndefined,
    otherTraits: fullyUndefined,
};

type Step4State = {
    inventory: FormField<ExpandedInventoryItem[]>
};

const step4Init: Step4State = {
    inventory: {
        value: [],
        error: null,
    },
};

type CreateCharacterState = Step1State & Step2State & Step3State & Step4State;

export type CreateCharacterFormState = {
    step: Steps;
} & CreateCharacterState;

export const initialState: CreateCharacterFormState = {
    step: 1,
    ...setp1Init,
    ...step2Init,
    ...step3Init,
    ...step4Init,
};

export type StateKeys = keyof CreateCharacterState;

export type Action =
  | { type: 'SetStep', step: Steps }
  | { type: 'SetField', fieldName: StateKeys, value: any, error?: string };


export function reducer(state: CreateCharacterFormState, action: Action): CreateCharacterFormState {
  switch (action.type) {
    case 'SetStep':
        return { ...state, step: action.step };
    case 'SetField':
        return { 
            ...state, 
            [action.fieldName]: {
                value: action.value,
                error: action.error ?? null
            }
        };
    default:
        return state;
  }
}

function isValidStep1(state: CreateCharacterFormState, dispatch: React.Dispatch<Action>) {

    return true;
}

function isValidStep2(state: CreateCharacterFormState, dispatch: React.Dispatch<Action>) {

    return true;
}

function isValidStep4(state: CreateCharacterFormState, dispatch: React.Dispatch<Action>) {

    return true;
}


export function useCreateCharacterReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return {
        state,
        setField: (filedName: StateKeys, value: any, error?: string) => 
            dispatch({
                type: "SetField",
                fieldName: filedName,
                value,
                error
            }),
        setStep: (step: Steps) =>
            dispatch({
                type: "SetStep",
                step
            }),
        isValidStep1: () => isValidStep1(state, dispatch),
        isValidStep2: () => isValidStep2(state, dispatch),
        isValidStep4: () => isValidStep4(state, dispatch),
    }
}


