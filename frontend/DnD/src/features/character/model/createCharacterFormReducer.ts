import { FormField } from "@/shared/types/IFormField";
import { useReducer } from "react";

type CreateCharacterState = {
    name: FormField<string>;
    isPublic: FormField<boolean>;
    coinsAffectWeight: FormField<boolean>;
};

export type CreateCharacterFormState = {
    step: number;
} & CreateCharacterState;

export type Steps = 1;

export type StateKeys = keyof CreateCharacterState;

export type Action =
  | { type: 'SetStep', step: Steps }
  | { type: 'SetField', fieldName: StateKeys, value: any, error?: string };

export const initialState: CreateCharacterFormState = {
    step: 1,
    name: {
        value: undefined,
        error: null
    },
    isPublic: {
        value: true,
        error: null
    },
    coinsAffectWeight: {
        value: true,
        error: null
    }
};

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
    }
}
