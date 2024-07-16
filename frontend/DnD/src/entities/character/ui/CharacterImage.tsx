import { ReactChildrenProps } from "@/shared/types/reactChildrenProps";
import { QuestionMark } from "@mui/icons-material";
import { Box, CardMedia, Skeleton, useTheme } from "@mui/material";
import { ReactNode } from "react";

const defaultImageHeight = 250;

const CharacterImageWrapper = ({children, imageHeight}: ReactChildrenProps & { imageHeight: number | string}) => {
    const theme = useTheme();

    return  <Box sx={{
        height: imageHeight,
        backgroundColor: theme.palette.grey.A200,
        display: 'flex',
        position: "relative",
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        {children}
    </Box>
};

function ImageOverlay({children}: ReactChildrenProps) {
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

interface CharacterImageSkeletonProps {
    height?: number | string; 
}

export const CharacterImageSkeleton = ({height = defaultImageHeight}: CharacterImageSkeletonProps) => <CharacterImageWrapper imageHeight={height}>
        <Skeleton variant="rectangular" animation="wave" height={height} />
    </CharacterImageWrapper>

interface CharacterImageProps {
    base64Image?: string | null,
    noImageIconOverride?: ReactNode,
    imageOverlayChildren?: ReactNode;
    height?: number | string; 
}

export function CharacterImage({base64Image, noImageIconOverride, imageOverlayChildren, height = defaultImageHeight}: CharacterImageProps) {
    const theme = useTheme();

    return <CharacterImageWrapper imageHeight={height}>
        {base64Image == null && <>
            {noImageIconOverride}
            {noImageIconOverride == undefined && <QuestionMark style={{color: theme.palette.grey.A100}} />}
        </>}
        {base64Image != null && <CardMedia component="img" sx={{height: height}} src={`data:image/jpeg;base64,${base64Image}`}/>}
        {imageOverlayChildren && <ImageOverlay>{imageOverlayChildren}</ImageOverlay>}
    </CharacterImageWrapper>
}
