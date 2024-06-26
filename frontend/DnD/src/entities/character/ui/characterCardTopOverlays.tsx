import IconWithCenteredValue, { iconWithCenteredValueFont } from "@/shared/ui/IconWithCenteredValue ";
import { Box, CardActionArea, styled } from "@mui/material";
import ShieldIcon from '@mui/icons-material/Shield';
import SquareIcon from '@mui/icons-material/Square';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

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