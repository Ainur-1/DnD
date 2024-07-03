import ChangePageTitle from "@/shared/ui/changePageTitle";
import { UncompletedSessionList } from "@/widgets/uncompletedSession/";
import { Stack } from "@mui/material";

export default function UncompletedSessionsPage() {

    return <>
        <ChangePageTitle title="Незавершённые сессии" />
        <Stack alignItems="center" maxHeight="100vh" overflow="auto">
            <UncompletedSessionList />
        </Stack>
    </>
}