import { CreatePartyForm, JoinPartyForm } from "@/widgets/parties/";
import { Stack, Typography } from "@mui/material";

export default function NewPartyPage() {

    return <Stack id="dsfsdf" paddingRight={3} paddingLeft={3} alignContent="space-between">
        <JoinPartyForm />
        <Stack alignItems="center" marginTop={5} marginBottom={5}>
            <Typography variant="h4" component="div" sx={{fontWeight: "bold"}} >
                ИЛИ
            </Typography>
            <Typography variant="body1" component="div" textAlign="center" marginTop={2}>
                Создайте новый отряд и станьте гейм-мастером.
            </Typography>
        </Stack>
        <CreatePartyForm />
    </Stack>
}