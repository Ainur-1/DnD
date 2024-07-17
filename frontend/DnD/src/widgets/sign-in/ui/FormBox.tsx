import { Box, Typography } from "@mui/material"
import { ReactNode } from "react"

interface ForomBoxProps {
    children: ReactNode,
    formTitle: string,
    formError?: string | null,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>

}

export default function FormBox({children, formTitle, formError=null, handleSubmit}: ForomBoxProps) {

    return <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
        <Typography component="h1" variant="h4">
            {formTitle}
        </Typography>
        <Typography component="h4" variant="h4" color="error">
            {formError}
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
            {children}
        </Box>
    </Box>
}