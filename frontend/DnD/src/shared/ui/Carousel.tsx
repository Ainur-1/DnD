import { Box, IconButton, Paper, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import CommunityCarousel from 'react-material-ui-carousel'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

interface CarouselProps<T> {
    items: T[],
    constructNode: (item:T, itemIndex: number) => ReactNode
}

export default function Carousel<T>({items, constructNode}: CarouselProps<T>) {
    const [activeStep, setActiveStep] = React.useState<number>(0);

    return <Box>
        <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>  
            {`${activeStep + 1} / ${items.length}`}
        </Typography>
        <CommunityCarousel
            sx={{
                paddingTop: 1,
                paddingBottom:1
            }}
            index={activeStep}
            navButtonsAlwaysVisible
            cycleNavigation={false}
            swipe={true}
            indicators={false}
            fullHeightHover={true}
            indicatorContainerProps={{
                style: {
                marginTop: '10px',
                },
            }}
            onChange={(now, _) => setActiveStep(now ?? 0)}
            NavButton={({ onClick, className, style, next, prev }) => (
                <IconButton
                  onClick={onClick}
                  className={className}
                  style={{
                    ...style,
                    backgroundColor: 'transparent',
                    margin: '0 20px',
                    color: 'black',
                  }}
                >
                  {next && <ArrowRightIcon color="primary"/>}
                  {prev && <ArrowLeftIcon color="primary"/>}
                </IconButton>
              )}
        >
            {items.map((item, index) => constructNode(item, index))}
        </CommunityCarousel>
    </Box>
}