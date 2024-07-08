import { useCreatePartyMutation } from "@/features/party/api/api";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePartyForm() {
    const navigate = useNavigate();
    const [accessCode, setAccessCode] = useState<string>();
    const [accessCodeError, setAccessCodeError] = useState<string>();
    const [requestError, setRequestError] = useState<string>();

    const [createParty, {isLoading, isSuccess, isError, data}] = useCreatePartyMutation();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const empty = "";

        if (isLoading) {
            return;
        }

        setRequestError(empty);
        if (!accessCode || accessCode.length == 0) {
            setAccessCodeError("Поле обязательно.");
            return;
        }

        setAccessCodeError(empty);

        await createParty({ accessCode: accessCode!});
    }

    useEffect(() => {
        if (isSuccess) {
            navigate(`/game/${data.createParty.uuid}`);
        } else if (isError) {
            setRequestError("Не возможно создать игру.");
        }
    }, [isSuccess, isError, data]);

    return  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value.trim())}
            helperText={accessCodeError}
            error={accessCodeError != "" && accessCodeError != undefined}
            margin="dense"
            required
            fullWidth
            label="Код доступа"
        />
        <Stack alignItems="center" marginTop={!requestError ? 3 : 0}>
            { requestError && 
                <Typography component="span" color="error" marginBottom={3}>
                    {requestError}
                </Typography>
            }
            <Button variant="contained" type="submit" size="large" fullWidth disabled={isLoading}>
                Создать
            </Button>
        </Stack>
    </Box>
}