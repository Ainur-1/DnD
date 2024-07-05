import { Box, Typography, Grid, Skeleton, Stack } from '@mui/material';


interface CharacterCardTopProps {
    name: string,
    race: string,
    className: string,
    level: string,
}

const alrightTextSx = {
    textAlign: "end"
}

const ShortCharacterInfo = ({name, race, className, level}: CharacterCardTopProps) => {

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

export const ShortCharacterInfoSkeleton = () => <Stack sx={{ padding: 2 }}>
  <Skeleton animation="wave" />
  <Skeleton animation="wave" />
</Stack>

export default ShortCharacterInfo;
