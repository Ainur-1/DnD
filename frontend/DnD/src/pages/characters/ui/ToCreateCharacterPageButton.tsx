import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ToCreateCharacterPageButton = () => {
    const navigateTo = useNavigate();

    const onClick = () => navigateTo('/my-characters/create');

    return <Box  sx={{
        position: "fixed",
        bottom: "5vh",
        left: 0,
        right: 0,
        paddingLeft: "5vw",
        paddingRight: "5vw",
        zIndex: 20
    }}>
        <Button variant="contained" fullWidth size="medium" onClick={onClick}>
            Создать персонажа
        </Button>
    </Box>
};

export default ToCreateCharacterPageButton;