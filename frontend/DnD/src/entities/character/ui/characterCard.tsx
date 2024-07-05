import { CardActions } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import ShortCharacterInfo, { ShortCharacterInfoSkeleton } from "./characterCardTop";
import { ReactNode } from "react";
import { Personality } from "../model/types";
import { CharacterImage, CharacterImageSkeleton } from "./CharacterImage";

interface CardWrapperProps {
    cardImage: ReactNode,
    cardContent: ReactNode,
    cardActions?: ReactNode,
};

function CardWrapper({cardImage, cardContent, cardActions}: CardWrapperProps) {

    return <Card sx={{ width: 345 }}>
        {cardImage}
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
        cardImage={<CharacterImage base64Image={characterImageBase64} imageOverlayChildren={imageOverlayChildren}/>}
        cardContent={<ShortCharacterInfo 
            className={characterClass} 
            level={characterLevel.toString()} 
            name={characterName} 
            race={characterRace}
            />}
        cardActions={cardActions}
        />
}