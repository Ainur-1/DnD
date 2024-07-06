import { Box, Typography } from "@mui/material"

interface InventoryWeightProps {
    weightInPounds: number
}

export default function InventoryWeight({ weightInPounds }: InventoryWeightProps) {
    return <Box display="flex" alignItems="center" justifyContent="space-between" marginTop={1} marginBottom={1}>
        <Typography component="div" variant="h6">
            Общий вес
        </Typography>
        <Typography component="div" variant="body1">
            {weightInPounds} фунт.
        </Typography>
    </Box>
}