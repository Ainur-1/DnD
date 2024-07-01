import { QuestionMark } from "@mui/icons-material";
import { Box, CardMedia, useTheme } from "@mui/material";

interface ItemIconProps {
    iconUrl?: string
    itemAlt?: string,
    height: number
}

export function ItemIcon({iconUrl, itemAlt, height}: ItemIconProps) {
    const theme = useTheme();

    if (!iconUrl) {
        return <Box sx={{
            backgroundColor: theme.palette.grey.A200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: height,
            height: height
        }}>
            <QuestionMark style={{color: theme.palette.grey.A100}} />
        </Box>
    }

    return  <CardMedia component="img" src={iconUrl} alt={itemAlt} width={height} height={height}/>
}