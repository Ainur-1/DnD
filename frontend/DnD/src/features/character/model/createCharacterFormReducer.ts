import { FormField } from "@/shared/types/IFormField";
import { useReducer } from "react";

export type Steps = 1 | 2;

type Step1State = {
    name: FormField<string>;
    isPublic: FormField<boolean>;
    coinsAffectWeight: FormField<boolean>;
}

const setp1Init = {
    name: {
        value: undefined,
        error: null
    },
    isPublic: {
        value: true,
        error: null
    },
    coinsAffectWeight: {
        value: false,
        error: null
    }
};

type CreateCharacterState = Step1State;

export type CreateCharacterFormState = {
    step: Steps;
} & CreateCharacterState;

export const initialState: CreateCharacterFormState = {
    step: 1,
    ...setp1Init,
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
    }
}


