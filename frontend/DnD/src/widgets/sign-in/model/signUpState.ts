import { FormField } from "@/shared/types/IFormField";
import { useReducer } from "react";

interface SignUpState {
    email: FormField<string>,
    username: FormField<string>
    name: {
      value: string;
    };
    password: FormField<string>
    passwordRepeat: FormField<string>
}

enum StateChangeType {
    setField,
    setError,
    resetErrors
};

const initialState: SignUpState = {
    email: {
      value: '',
      error: null
    },
    username: {
      value: '',
      error: null
    },
    name: {
      value: ''
    },
    password: {
      value: '',
      error: null
    },
    passwordRepeat: {
      value: '',
      error: null
    },
}

type FieldName = keyof SignUpState;

type StateReducerAction = 
| { type: StateChangeType.setField; fieldName: FieldName; fieldValue: string }
| { type: StateChangeType.setError; fieldName: FieldName; errorMsg: string }
| { type: StateChangeType.resetErrors; };

const stateReducer = (state = initialState, action: StateReducerAction) => {
    switch (action.type) {
      case StateChangeType.setField:
        return {
          ...state,
          [action.fieldName]: {
            ...state[action.fieldName],
            value: action.fieldValue
          }
        };
  
      case StateChangeType.setError:
        if (action.fieldName === "name")
            return state;

        return {
            ...state,
            [action.fieldName]: {
              ...state[action.fieldName],
              error: action.errorMsg,
            },
          };
      
      case StateChangeType.resetErrors:
        return {
            ...state,
            email: { ...state.email, error: null },
            username: { ...state.username, error: null },
            password: { ...state.password, error: null },
            passwordRepeat: { ...state.passwordRepeat, error: null },
          };

      default:
        return state;
    }
};

const useStateReducer = () => {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    const setError = (fieldName: FieldName, errorMsg: string) => dispatch({
        type: StateChangeType.setError,
        fieldName,
        errorMsg,
    });
    
    const setField = (fieldName: FieldName, fieldValue: string) => dispatch({
        type: StateChangeType.setField,
        fieldName,
        fieldValue,
    });  
    
    const resetPasswords = () => {
        setField('password', '');
        setField('passwordRepeat', '');
    };

    const resetErrors = () => dispatch({
        type: StateChangeType.resetErrors
    });
    
    return { state, setError, setField, resetPasswords, resetErrors };
};
  
export { useStateReducer };
export type { SignUpState, FieldName };