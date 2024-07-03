import { Box, Typography, Grid, useTheme, CardMedia } from '@mui/material';
import { ReactChildrenProps } from "@/shared/types/reactChildrenProps";
import { QuestionMark } from "@mui/icons-material";

interface CharacterImageProps {
    base64Image?: string | null,
}

export function CharacterImage({base64Image}: CharacterImageProps) {
    const theme = useTheme();

    if (base64Image == null) {
        return <QuestionMark style={{color: theme.palette.grey.A100}} />
    }
    
    return <CardMedia component="img" sx={{height: 150}} src={`data:image;base64,${base64Image}`}/>
}

export function ImageOverlay({children}: ReactChildrenProps) {
    return <Box
        sx={{
            position: "absolute",
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'end',
            alignItems: "center",
            zIndex: 10,
        }}
    >
        {children}
    </Box>
}

interface CharacterCardTopProps {
    name: string,
    race: string,
    className: string,
    level: string,
}

const alrightTextSx = {
    textAlign: "end"
}

export const ShortCharacterInfo = ({name, race, className, level}: CharacterCardTopProps) => {

  return (
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: 17 }}>
              {name}
            </Typography>
          </Grid>
          <Grid item xs={6} >
            <Typography variant="body2" color="text.secondary" sx={alrightTextSx}>
              {race}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Lvl. {level}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" sx={alrightTextSx}>
              {className}
            </Typography>
          </Grid>
        </Grid>
      </Box>
  );
};

export default ShortCharacterInfo;
