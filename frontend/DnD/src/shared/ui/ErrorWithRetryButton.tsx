import { Button, Stack, Typography } from "@mui/material";

interface ErrorWithRetryButtonProps {
    errorText?: string;
    onRetryClicked?: () => void;
    retryButtonText?: string;
}

export default function ErrorWithRetryButton({retryButtonText, onRetryClicked, errorText}: ErrorWithRetryButtonProps) {

    return <Stack sx={{alignItems: "center"}}>
        <Typography margin="dense">
            {errorText ?? "Произошла ошибка"}
        </Typography>
        <Button onClick={onRetryClicked}>
            {retryButtonText ?? "Повторить"}
        </Button>
    </Stack>
}