import { Box, Typography, useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import CommunityCarousel from 'react-material-ui-carousel'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

interface CarouselProps<T> {
    items: T[],
    constructNode: (item:T, itemIndex: number) => ReactNode;
}

export default function Carousel<T>({items, constructNode}: CarouselProps<T>) {
    const [activeStep, setActiveStep] = React.useState<number>(0);
    const theme = useTheme();

    return <Box>
        <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>  
            {`${activeStep + 1} / ${items.length}`}
        </Typography>
        <CommunityCarousel
            sx={{
                paddingTop: 1,
                paddingBottom:1,
            }}
            index={activeStep}
            navButtonsProps={{
                style: {
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                    color: theme.palette.secondary.main
                }
                
            }}
            navButtonsWrapperProps={{
                style: {
                    marginLeft: -20,
                    marginRight: -20,
                }
            }}
            navButtonsAlwaysVisible
            autoPlay={false}
            cycleNavigation={false}
            swipe={true}
            indicators={false}
            fullHeightHover={true}
            NextIcon={<ArrowRightIcon />}
            PrevIcon={<ArrowLeftIcon />}
            indicatorContainerProps={{
                style: {
                marginTop: '10px',
                },
            }}
            onChange={(now, _) => setActiveStep(now ?? 0)}

        >
            {items.map((item, index) => constructNode(item, index))}
        </CommunityCarousel>
    </Box>
}

interface CarouselProps<T> {
    items: T[],
    constructNode: (item:T, itemIndex: number) => ReactNode;
}

export function FlexCarousel<T>({items, constructNode}: CarouselProps<T>) {
    const [activeStep, setActiveStep] = React.useState<number>(0);
    const theme = useTheme();

    return <Box>
        <Typography variant="h6" gutterBottom sx={{textAlign: 'center'}}>  
            {`${activeStep + 1} / ${items.length}`}
        </Typography>
        <CommunityCarousel
            sx={{
                paddingTop: 1,
                paddingBottom:1,
            }}
            index={activeStep}
            navButtonsProps={{
                style: {
                    backgroundColor: 'transparent',
                    borderRadius: 0,
                    color: theme.palette.secondary.main
                }
                
            }}
            navButtonsWrapperProps={{
                style: {
                    marginLeft: -20,
                    marginRight: -20,
                }
            }}
            navButtonsAlwaysVisible
            autoPlay={false}
            cycleNavigation={false}
            swipe={true}
            indicators={false}
            fullHeightHover={true}
            NextIcon={<ArrowRightIcon />}
            PrevIcon={<ArrowLeftIcon />}
            indicatorContainerProps={{
                style: {
                marginTop: '10px',
                },
            }}
            onChange={(now, _) => setActiveStep(now ?? 0)}

        >
            <Box display="flex" justifyContent="center">
                {items.map((item, index) => constructNode(item, index))}
            </Box>
        </CommunityCarousel>
    </Box>
}