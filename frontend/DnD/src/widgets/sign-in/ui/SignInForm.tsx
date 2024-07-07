import { TextField, FormControlLabel, Checkbox, Button, Grid } from "@mui/material";
import FormBox from "./FormBox";
import { useEffect, useState } from "react";
import { containsWhitespace } from "../model/utils";
import { useSignInMutation } from "@/features/auth";
import { useAuthReducer } from "@/features/auth";
import Link from "@/shared/ui/styledLink";

interface SignInFormProps {
  afterSuccessfulSignIn: () => void,
}

export function SignInForm({ afterSuccessfulSignIn }: SignInFormProps) {
  const [login, setLogin] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [remeberMe, setRememberMe] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [ signIn, { isLoading, isError, isSuccess, data }] = useSignInMutation();
  const { setUser } = useAuthReducer();

  const toggleRememberMe = () => setRememberMe(old => !old);

  function resetFormErrors() {
    setLoginError(false);
    setPasswordError(false);
    setRequestError("");
  }

  const invalidTextFieldValue = (value: string) => value === '' || containsWhitespace(value);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    resetFormErrors();

    const actualLogin = login.trim();
    const actualPassword = password.trim()
    if (invalidTextFieldValue(actualLogin)) {
      setLoginError(true);
      setLogin(actualLogin);
      return;
    } else if (invalidTextFieldValue(actualPassword)) {
      setPasswordError(true);
      setPassword('');
      return;
    }

    await signIn({login: actualLogin, password: actualPassword, rememberMe: remeberMe});
  }

  useEffect(() => {
    if (isError) {
      // todo error handle if network error or 
      setRequestError("Неверный логин или пароль.")
    } else if (isSuccess) {
      if (data && data.signIn.uuid) {
        setUser({userId: data.signIn.uuid});
        afterSuccessfulSignIn();
      } else {
        setRequestError("Ошибка авторизации.");
      }
    }
  }, [isSuccess, isError, data])

  return <FormBox formTitle="Вход" formError={requestError} handleSubmit={handleSubmit}>
          <TextField 
              value={login} 
              onChange={(e) => setLogin(e.target.value)} 
              margin="normal" 
              required 
              fullWidth  
              label="Почта/юзернейм" 
              type="text" 
              autoFocus
              error={loginError}
          />
          <TextField 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal" 
              required 
              fullWidth 
              label="Пароль" 
              type="password"
              error={passwordError}
          />
          <FormControlLabel control={<Checkbox checked={remeberMe} onChange={() => toggleRememberMe()}  value="remember" color="primary"/>} label="Запомнить меня"/>
          <Button disabled={isLoading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Войти
          </Button>
          <Grid container>
              <Grid item xs>
                <Link to="/recover-password">
                        Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up">
                        Регистрация
                </Link>
              </Grid>
          </Grid>   
  </FormBox>
}