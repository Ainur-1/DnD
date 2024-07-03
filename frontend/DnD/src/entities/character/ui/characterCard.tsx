import { CardActions, useTheme } from "@mui/material";
import { Box, Card, CardContent } from "@mui/material";
import ShortCharacterInfo, { CharacterImage, CharacterImageSkeleton, ImageOverlay, ShortCharacterInfoSkeleton } from "./characterCardTop";
import { ReactNode } from "react";
import { Personality } from "../model/types";

interface CardWrapperProps {
    cardImage: ReactNode,
    cardContent: ReactNode,
    cardActions?: ReactNode,
};

function CardWrapper({cardImage, cardContent, cardActions}: CardWrapperProps) {
    const theme = useTheme();

    return <Card sx={{ width: 345 }}>
        <Box sx={{
            height: 150,
            backgroundColor: theme.palette.grey.A200,
            display: 'flex',
            position: "relative",
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {cardImage}
        </Box>
        <CardContent>
            {cardContent}
        </CardContent>
        <CardActions>
            {cardActions}
        </CardActions>
    </Card>
}

export const CharacterCardSkeletone = () => <CardWrapper 
    cardImage={<CharacterImageSkeleton/>} 
    cardContent={<ShortCharacterInfoSkeleton/>}/>

interface CharacterCardProps {
    characterInfo: Personality;
    cardActions?: ReactNode;
    imageOverlayChildren?: ReactNode | null;
}

export default function CharacterCard({cardActions, characterInfo, imageOverlayChildren}: CharacterCardProps) {
    const {
        characterClass,
        characterLevel,
        characterName,
        characterRace,
        characterImageBase64
    } = characterInfo;

    return <CardWrapper 
        cardImage={<>
                <CharacterImage base64Image={characterImageBase64} />
                {imageOverlayChildren && <ImageOverlay>{imageOverlayChildren}</ImageOverlay>}
            </>}
        cardContent={<ShortCharacterInfo 
            className={characterClass} 
            level={characterLevel.toString()} 
            name={characterName} 
            race={characterRace}
            />}
        cardActions={cardActions}
        />
}