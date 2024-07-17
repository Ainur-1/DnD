import { useState } from "react";
import FormBox from "./FormBox";
import { FieldName, useStateReducer } from "../model/signUpState";
import { Button, TextField } from "@mui/material";
import { getErrosForSignUpState } from "../model/utils";
import { useSignUpMutation } from "@/features/auth";

interface SignUpFormProps {
  afterSuccessfulSignUp: () => void,
}

export function SignUpForm({ afterSuccessfulSignUp }: SignUpFormProps) {
    const [requestError, setRequestError] = useState('');
    const { state, setError, setField, resetPasswords, resetErrors } = useStateReducer();
    const [ signUp, { isLoading, isError, /*error*/ }] = useSignUpMutation();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      resetErrors();
      const errors = getErrosForSignUpState(state);

      const errorEntries = Object.entries(errors)
      for (const [fieldName, error] of errorEntries) {
        setError(fieldName as FieldName, error)
      }
      
      if (errorEntries.length > 0) {
        if (errors.password) {
          resetPasswords();
        }
        if (errors.passwordRepeat) {
          setField("passwordRepeat", "");
        }
        return;
      }
      
      const nameValue = state.name.value.trim();
      const { data } = await signUp({
          email: state.email.value!.trim(),
          name: nameValue === '' ? null : nameValue,
          password: state.password.value!.trim(),
          username: state.username.value!.trim()
      });

      if (isError) {
        setRequestError("Ошибка при регистрации.");
        resetPasswords();
      } else if (data && data.signUp.boolean) {
        afterSuccessfulSignUp();
      } else if (data && data.signUp.errors && data.signUp.errors.length > 0) {
        setRequestError(data.signUp.errors[0].message);
      }
    }

    return <FormBox formTitle="Регистрация" formError={requestError} handleSubmit={handleSubmit}>
      <TextField 
        value={state.email.value} 
        error={state.email.error != null}
        helperText={state.email.error}
        onChange={(e) => setField("email", e.target.value)}
        margin="normal" 
        required 
        fullWidth 
        label="Почта" 
        type='email' 
        autoFocus/>
      <TextField
        value={state.username.value} 
        error={state.username.error != null}
        helperText={state.username.error}
        onChange={(e) => setField("username", e.target.value)}
        margin="normal"
        required
        fullWidth
        label="Юзернейм"
        type="text"/>  
      <TextField
        value={state.name.value} 
        onChange={(e) => setField("name", e.target.value)}
        margin="normal"
        fullWidth
        label="Имя"
        type="text"/>
      <TextField
        value={state.password.value} 
        error={state.password.error != null}
        helperText={state.password.error}
        onChange={(e) => setField("password", e.target.value)}
        margin="normal"
        required
        fullWidth
        label="Пароль"
        type="password"/>
      <TextField
        value={state.passwordRepeat.value} 
        error={state.passwordRepeat.error != null}
        helperText={state.passwordRepeat.error}
        onChange={(e) => setField("passwordRepeat", e.target.value)}
        margin="normal"
        required
        fullWidth
        label="Повтор пароля"
        type="password"/>
      <Button disabled={isLoading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Регистрация
      </Button>  
    </FormBox>
}