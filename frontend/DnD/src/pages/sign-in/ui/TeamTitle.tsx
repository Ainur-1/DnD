import { Typography, Box } from "@mui/material";

export default function TeamTitle() {
    return <Box alignItems="center" display="flex" flexDirection="column">
        <Typography  component="h1" variant="h4" fontFamily={"Open Sans"}>
            D'n'D
        </Typography>
        <Typography component="h1" variant="h4" fontFamily={"Open Sans"}>
            Команда 0
        </Typography>
    </Box>
}