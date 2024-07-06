import { UncompletedSessionList } from "@/widgets/uncompletedSession/";
import { Stack } from "@mui/material";

export default function UncompletedSessionsPage() {

    return <Stack alignItems="center" maxHeight="100vh" overflow="auto">
            <UncompletedSessionList />
    </Stack>
}