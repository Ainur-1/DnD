import { Rating, Stack, styled, Typography, useTheme } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import DangerousIcon from '@mui/icons-material/Dangerous';

interface StyledRatingPorps {
    iconFilledColor: string,
    iconHoverColor: string,
}

const getStyledRating = ({ iconFilledColor, iconHoverColor }: StyledRatingPorps) => styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: iconFilledColor,
    },
    '& .MuiRating-iconHover': {
      color: iconHoverColor,
    },
  });


interface SavingThrowsDisplayProps {
    readonly?: boolean,
    successCount: number | null,
    failuresCount: number | null,
    changeSuccessCount: (value: number | null) => void,
    changeFailuresCount: (value: number | null) => void,
}

export default function SavingThrowsDisplay({changeFailuresCount, changeSuccessCount, readonly, successCount, failuresCount}: SavingThrowsDisplayProps) {
    const theme = useTheme();
    const pallete = theme.palette;

    const SuccessStyledRating = getStyledRating({iconFilledColor: pallete.success.light, iconHoverColor: pallete.success.dark});
    const FailureStyledRating = getStyledRating({iconFilledColor: pallete.error.light, iconHoverColor: pallete.error.dark});

    return <Stack sx={{
            '& > legend': { mt: 2 },
            alignItems: "center"
        }}
    >
        <Typography component="legend" variant="body1" sx={{
            fontWeight: 'bold'
        }}>
            Спасброски
        </Typography>
        <Stack paddingTop={1} alignItems="center">
            <SuccessStyledRating 
                readOnly={readonly} 
                name="customized-color"
                value={successCount}
                precision={1}
                max={3}
                icon={<DoneIcon fontSize="inherit" />}
                emptyIcon={<DoneIcon fontSize="inherit" />}
                onChange={(_, newValue) => { changeSuccessCount(newValue) }}
            />
            <FailureStyledRating
                readOnly={readonly}
                value={failuresCount}
                precision={1}
                max={3}
                icon={<DangerousIcon fontSize="inherit" />}
                emptyIcon={<DangerousIcon fontSize="inherit" />}
                onChange={(_, newValue) => { changeFailuresCount(newValue) }}
            />
        </Stack>
    </Stack>
}