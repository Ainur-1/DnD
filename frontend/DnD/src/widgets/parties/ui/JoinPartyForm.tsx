import { useJoinPartyMutation } from "@/features/party";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinPartyForm() {
    const navigate = useNavigate();
    const [partyId, setPartyId] = useState<string | undefined>();
    const [partyError, setPartyError] = useState<string>();
    const [accessCode, setAccessCode] = useState<string | undefined>();
    const [accessCodeError, setAccessCodeError] = useState<string>();
    const [requestError, setRequestError] = useState<string>();

    const [joinParty, { isLoading, isSuccess, data }] = useJoinPartyMutation();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const empty = "";

        if (isLoading) {
            return;
        }

        let validForm = true;
        if (!partyId) {
            setPartyError("Поле обязательно.");
            validForm = false;
        }
        if (!accessCode) {
            setAccessCodeError("Поле обязательно.");
            validForm = false;
        }

        setRequestError(empty);
        if (!validForm) {
            return;
        } else {
            setAccessCodeError(empty);
            setPartyError(empty)
        }

        await joinParty({ partyId: partyId!, accessCode: accessCode!});
        
        if (isSuccess) {
            const { success, error } = data;

            if (success) {
                navigate(`/game/${partyId}`);
            } else if(error) {
                setRequestError(error);
            } else {
                setRequestError("Не возможно присоединиться к игре.");
            }
        } else {
            setRequestError("Ошибка при запросе.");
        }
    }

    return  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
            value={partyId}
            onChange={(e) => setPartyId(e.target.value.trim())}
            helperText={partyError}
            error={partyError != undefined}
            margin="dense"
            required
            fullWidth
            label="Индетификатор отряда"
        />
        <TextField
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value.trim())}
            helperText={accessCodeError}
            error={accessCodeError != undefined}
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
            <Button variant="contained" type="submit"  size="large" fullWidth disabled={isLoading}>
                Присоединиться
            </Button>
        </Stack>
    </Box>
}