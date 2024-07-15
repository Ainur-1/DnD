import IconWithCenteredValue, { iconWithCenteredValueFont } from "@/shared/ui/IconWithCenteredValue ";
import { Box, CardActionArea, Grid, styled, Typography } from "@mui/material";
import ShieldIcon from '@mui/icons-material/Shield';
import SquareIcon from '@mui/icons-material/Square';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowUpTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowUpTwoTone';

interface InGameLiveOverlay {
    hp: number,
    tempHp: number,
    armor: number,
    initiativeBonus: number,
    proficiencyBonus: number,
    speed: number,
    showCharacterInfo: () => void
}

const iconFontSize = 45;

const HeartIcon = () => <FavoriteIcon sx={{
    color: "#ff6d75",
    fontSize: iconFontSize}} />

const ArmorClassIcon = () => <ShieldIcon sx={{
    fontSize: iconFontSize,
    color: "#848492",
}} />

const InitiaiveIcon = () => <SquareIcon sx={{
    fontSize: iconFontSize,
    color: "#286c6e",
}}/>

const ProficiencyIcon = () => <CircleIcon sx={{
    fontSize: iconFontSize,
    color: "#c2721b",
}}/>

const blueColor = "#084880";
const SpeedIcon = () => <DirectionsRunIcon sx={{
    fontSize: iconFontSize,
    color: blueColor
}}/>

const StyledSpeedSpan = styled("span")({
    fontSize: iconWithCenteredValueFont.fontSize,
    fontWeight: iconWithCenteredValueFont.fontWeight,
    color: blueColor
});

export function InGameLiveOverlay({hp,  tempHp, initiativeBonus, armor, proficiencyBonus, speed, showCharacterInfo }: InGameLiveOverlay) {

    const initiativeBonusLabel = initiativeBonus < 0 ? initiativeBonus.toString() : `+${initiativeBonus}`;
    const proficiencyBonusLabel = proficiencyBonus < 0 ? proficiencyBonus.toString() : `+${proficiencyBonus}`;
    const hpLabel = tempHp == 0 ? hp : `${hp}+${tempHp}`;

    return <CardActionArea 
    onClick={showCharacterInfo}
    sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "end"
    }}>
        <Box sx={{
            display: "flex",
        }}>
            <IconWithCenteredValue value={hpLabel} icon={<HeartIcon/>}/>
            <IconWithCenteredValue value={armor} icon={<ArmorClassIcon/>}/>
            <IconWithCenteredValue value={initiativeBonusLabel} icon={<InitiaiveIcon/>}/>
            <IconWithCenteredValue value={proficiencyBonusLabel} icon={<ProficiencyIcon/>}/>
            <Box sx={{
                display: "inline-flex",
                alignItems: "center"
            }}>
                <SpeedIcon/>
                <StyledSpeedSpan>
                    {speed}
                </StyledSpeedSpan>
            </Box>
        </Box>
    </CardActionArea>
}

interface CarouselCardOverlayProps {
    showDeadIcon: boolean,
    showInPartyLabel: boolean,
    showCanUpdateIcon: boolean,
}

export function CarouselCardOverlay({showDeadIcon, showInPartyLabel, showCanUpdateIcon}: CarouselCardOverlayProps) {

    return <>
        <Box sx={{
                flex: '0 0 80%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
        }}>
            {showDeadIcon &&
                <Box sx={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    '& .MuiSvgIcon-root': {
                      height: '100%',
                      width: '100%',
                    },
                }}
                >
                    <CloseIcon sx={{color: "#f52300ad", zIndex: 50}}/>
                </Box>
            }
        </Box>
        <Box flex='0 0 20%'>
            <Grid container alignItems="center" justifyContent="space-evenly" spacing={1}>
                <Grid justifyContent="flex-start" item xs={10}>
                    <Typography sx={{
                        background: "#6cb76c",
                        borderRadius: "5px",
                        textAlign: "center",
                    }}>
                        {showInPartyLabel && "В отряде"}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    {showCanUpdateIcon && <KeyboardDoubleArrowUpTwoToneIcon sx={{
                        color:"#3197f1",
                        background: "#8d6f45",
                        borderRadius: "50%",
                    }}
                    />}
                </Grid>
            </Grid>
        </Box>
    </>
}

interface LoadImageOverlayProps {

}

export function LoadImageOverlay({}: LoadImageOverlayProps) {
    return <CardActionArea 
    sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"
    }}>
        <Box sx={{
            display: "flex",
        }}>
        </Box>
    </CardActionArea>
}