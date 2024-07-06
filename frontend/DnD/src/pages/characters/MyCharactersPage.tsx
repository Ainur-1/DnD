import ChangePageTitle from "@/shared/ui/changePageTitle";
import { MyCharactersCarousel } from "@/widgets/character";
import { Stack } from "@mui/material";
import ToCreateCharacterPageButton from "./ui/ToCreateCharacterPageButton";

export default function MyCharactersPage() {

    return <>
        <ChangePageTitle title="Персонажи" />
        <Stack sx={{paddingTop: "10vh"}}>
            <MyCharactersCarousel />
        </Stack>
        <ToCreateCharacterPageButton/>
    </>
}