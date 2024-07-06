import { ReactChildrenProps } from "@/shared/types/reactChildrenProps";
import { QuestionMark } from "@mui/icons-material";
import { Box, CardMedia, Skeleton, useTheme } from "@mui/material";
import { ReactNode } from "react";

const imageHeight = 150;

const CharacterImageWrapper = ({children}: ReactChildrenProps) => {
    const theme = useTheme();

    return  <Box sx={{
        height: 150,
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

export const CharacterImageSkeleton = () => <CharacterImageWrapper>
        <Skeleton variant="rectangular" animation="wave" height={imageHeight} />
    </CharacterImageWrapper>

interface CharacterImageProps {
    base64Image?: string | null,
    imageOverlayChildren?: ReactNode
}

export function CharacterImage({base64Image, imageOverlayChildren}: CharacterImageProps) {
    const theme = useTheme();

    return <CharacterImageWrapper>
        {base64Image == null && <QuestionMark style={{color: theme.palette.grey.A100}} />}
        {base64Image != null && <CardMedia component="img" sx={{height: imageHeight}} src={`data:image/jpeg;base64;${base64Image}`}/>}
        {imageOverlayChildren && <ImageOverlay>{imageOverlayChildren}</ImageOverlay>}
    </CharacterImageWrapper>
}
