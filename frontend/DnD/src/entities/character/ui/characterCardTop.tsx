import { ReactNode } from "react";
import { CharacterInfoBase } from "../model/characterBase";
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { ReactChildrenProps } from "@/shared/types/reactChildrenProps";
import unknownCharacterImage from "./unknown.png";
import { QuestionMark } from "@mui/icons-material";


interface CharacterImageProps {
    base64Image?: string | null,
}

function CharacterImage({base64Image}: CharacterImageProps) {
    const theme = useTheme();
    const imageSrc = base64Image == null ? unknownCharacterImage : `data:image;base64,${base64Image}`;

    if (base64Image == null) {
        return <QuestionMark style={{color: theme.palette.grey.A100}} />
    }

    return <img
        src={imageSrc}
        alt="Character"
        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
    />
}

function ImageOverlay({children}: ReactChildrenProps) {
    return <Box
        sx={{
            position: "absolute",
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: "end",
            zIndex: 10,
        }}
    >
        {children}
    </Box>
}

interface CharacterCardTopProps {
    characterInfo : CharacterInfoBase,
    imageOverlayChildren?: ReactNode | null,
}

const alrightTextSx = {
    textAlign: "end"
}

export const ShortCharacterInfo = ({characterInfo, imageOverlayChildren}: CharacterCardTopProps) => {
    const theme = useTheme(); 
    const { 
    characterName, 
    characterRace, 
    characterClass, 
    characterLevel, 
    characterImageBase64,
    } = characterInfo;



  return (
    <Box sx={
        {
            width: 250,
        }
    }>
      <Box
        sx={{
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
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: 17 }}>
              {characterName}
            </Typography>
          </Grid>
          <Grid item xs={6} >
            <Typography variant="body2" color="text.secondary" sx={alrightTextSx}>
              {characterRace}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Lvl. {characterLevel}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" sx={alrightTextSx}>
              {characterClass}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ShortCharacterInfo;
