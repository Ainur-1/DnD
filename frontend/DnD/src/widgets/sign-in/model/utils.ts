import { SignUpState } from "./signUpState";

export function containsWhitespace(str: string) {
    return Boolean(str.match(/\s/));
}


export function getErrosForSignUpState(state: SignUpState) {
    const errors: Partial<Record<keyof SignUpState, string>> = {};

    const fieldIsRequiredMsg = "Поле обязательно.";
      
    const actualEmail = state.email.value?.trim();
    if(!actualEmail) {
        errors.email = fieldIsRequiredMsg;
    } else if (!/\S+@\S+\.\S+/.test(actualEmail)) {
        errors.email = "Не допустимый формат.";
    }

    const username = state.username.value?.trim();
    if(!username) {
        errors.username = fieldIsRequiredMsg;
    } else if (!/^[a-zA-Z0-9]+$/.test(state.username.value!.trim())) {
        errors.username = "Используйте только a-z A-Z 0-9.";
    }

    const actualPassword = state.password.value?.trim();
    if(!actualPassword){
        errors.password = fieldIsRequiredMsg;
    }

    const actualPasswordRepeatition = state.passwordRepeat.value?.trim();
    if(!actualPasswordRepeatition) {
        errors.passwordRepeat = fieldIsRequiredMsg;
    } else if (actualPassword !== actualPasswordRepeatition) {
        errors.passwordRepeat = "Пароли не совпадают."
    }

    return errors;
}