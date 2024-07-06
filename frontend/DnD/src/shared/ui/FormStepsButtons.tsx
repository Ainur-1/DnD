import { Box, Button } from "@mui/material";

interface FormStepsButtonsProps {
    showPrevButton?: boolean;
    prevButtonDisabled?: boolean;
    prevButtonText?: string;
    onPrevButtonClicked?: React.MouseEventHandler<HTMLButtonElement>,

    nextButtonType?: "reset" | "submit" | "button";
    onNextButtonClicked?: React.MouseEventHandler<HTMLButtonElement>;
    nextButtonDisabled?: boolean;
    nextButtonText?: string;
}

export function FormStepsButtons({
    showPrevButton = true,
    prevButtonDisabled = false, 
    nextButtonDisabled = false,
    nextButtonType = "button",
    onNextButtonClicked,
    onPrevButtonClicked,
    prevButtonText, 
    nextButtonText}: FormStepsButtonsProps) {

    return <Box display="flex" justifyContent={showPrevButton ? "space-between" : "flex-end"}
        alignContent="center"
        marginTop={5}
    >
        {
            showPrevButton && <Button disabled={prevButtonDisabled} size="medium" variant="text" onClick={onPrevButtonClicked}>
                {prevButtonText}
            </Button>
        }
        <Button disabled={nextButtonDisabled} type={nextButtonType} size="medium" variant="contained" onClick={onNextButtonClicked}>
            {nextButtonText}
        </Button>
    </Box>
}