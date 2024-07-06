import { Box, Typography } from "@mui/material"

interface InventoryWeightProps {
    weightInPounds: number
}

export default function InventoryWeight({ weightInPounds }: InventoryWeightProps) {
    return <Box flex="flex" alignItems="center" justifyContent="space-between">
        <Typography component="div" variant="h6" textAlign="start">
            Общий вес
        </Typography>
        <Typography component="div" variant="body2" textAlign="end">
            {weightInPounds} фунт.
        </Typography>
    </Box>
}