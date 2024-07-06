import ChangePageTitle from "@/shared/ui/changePageTitle";
import { CreateCharcaterForm } from "@/widgets/character";
import { Box } from "@mui/material";

export default function CreateCharacterPage() {
    return <>
        <ChangePageTitle title="Создание персонажа" />
        <Box maxWidth="xs">
            <CreateCharcaterForm />
        </Box>
    </>   
}