import { Container, Stack } from "@mui/material";
import { ReactNode } from "react";

interface CenterContentProps {
    children: ReactNode
}

export default function CenterContent({children}: CenterContentProps) {

    return <Container>
        <Stack
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            }}
        >
            {children}
        </Stack>
    </Container>
}