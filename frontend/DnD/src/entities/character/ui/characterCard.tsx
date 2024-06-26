import { CardActions, useTheme } from "@mui/material";
import { Box, Card, CardContent } from "@mui/material";
import ShortCharacterInfo, { CharacterImage, ImageOverlay } from "./characterCardTop";
import { ReactNode } from "react";
import { CharacterInfoBase } from "../model/types";

interface CharacterCardProps {
    characterInfo: CharacterInfoBase;
    cardActions?: ReactNode;
    imageOverlayChildren?: ReactNode | null;
}

export default function CharacterCard({cardActions, characterInfo, imageOverlayChildren}: CharacterCardProps) {
    const theme = useTheme();
    const {
        characterClass,
        characterLevel,
        characterName,
        characterRace,
        characterImageBase64
    } = characterInfo;

    return <Card sx={{ maxWidth: 345 }}>
            <Box sx={{
                height: 150,
                backgroundColor: theme.palette.grey.A200,
                display: 'flex',
                position: "relative",
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
                <CharacterImage base64Image={characterImageBase64} />
                {
                    imageOverlayChildren && 
                    <ImageOverlay>
                        {imageOverlayChildren}
                    </ImageOverlay>
                }
            </Box>
        <CardContent>
            <ShortCharacterInfo 
                className={characterClass} 
                level={characterLevel.toString()} 
                name={characterName} 
                race={characterRace}
            />
        </CardContent>
        <CardActions>
            {cardActions}
        </CardActions>
    </Card>
}