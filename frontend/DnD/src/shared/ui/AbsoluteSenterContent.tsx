import { Box } from "@mui/material";
import { ReactChildrenProps } from "../types/reactChildrenProps";

export function AbsoluteCenterContent({children}: ReactChildrenProps) {

    return <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
        {children}
    </Box>
}