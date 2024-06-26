import { ReactChildrenProps } from "@/shared/types/reactChildrenProps";
import { Button, Container, Stack } from "@mui/material";


function ButtonBar({children}: ReactChildrenProps) {

    return <Container sx={{
        minHeight: 90,
        alignItems: "end",
        paddingBottom: 2
    }}>
        <Stack gap={1.5} >
            {children}
        </Stack>
    </Container>
}

interface SuggestItemButtonProps {

}

function SuggestItemButton({}: SuggestItemButtonProps) {

    return <Button variant="outlined">
        Предложить предмет
    </Button>
}


interface RestrictedCharacterControlBarProps {

}

export function RestrictedCharacterControlBar({}: RestrictedCharacterControlBarProps) {
    
    return <ButtonBar>
        <SuggestItemButton/>
    </ButtonBar>
}

interface CharacterControlBarProps {

}

export default function CharacterControlBar({}: CharacterControlBarProps) {
    
    return <ButtonBar>
        <SuggestItemButton/>
        <Button variant="outlined">
            Нанести урон
        </Button>
        <Button variant="outlined">
            Лечить
        </Button>
    </ButtonBar>
}