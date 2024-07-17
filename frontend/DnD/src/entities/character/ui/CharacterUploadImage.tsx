import { CharacterImage } from "./CharacterImage";
import { useRef, useState } from "react";
import { convertFileToBase64 } from "@/shared/utils/fileConverter";
import { Box, CardActionArea, IconButton, useTheme } from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddIcon from '@mui/icons-material/Add';

interface DeleteImageOverlayProps {
    deleteImage: () => void
}
function DeleteImageOverlay({deleteImage}: DeleteImageOverlayProps) {

    return <Box height="100%" width="100%" display="flex" alignItems="flex-start" justifyContent="flex-end">
        <IconButton sx={{
            marginRight: -2,
            marginTop: -2
        }}
        onClick={deleteImage}
        >
            <ClearOutlinedIcon color="error" fontSize="large"/>
        </IconButton>
    </Box>
}

interface AddImageOverlayProps {
    addImage: (base64Iamge: string) => void
}

function AddImageOverlay({addImage}: AddImageOverlayProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [disabled, setDisabled] = useState(false);
    const handleButtonClick = () => {
        fileInputRef.current?.click();
      };

    const handleChange = async (e: File | null) => {
        if (e == null) {
            return;
        }

        if (!e.type.startsWith("image/jpeg")) {
            return;
        } else if (e.size > 3 * 1024 * 1024) {
            alert("Файл слишком большой. Не более 3 мб.");
            return;
        }

        setDisabled(true);
        try {
            const base64 = await convertFileToBase64(e);
            addImage(base64);
        } catch {
            alert("Не удалось загурзить изображение.");
        } finally {
            setDisabled(false);
        }
    };

    return <CardActionArea onClick={handleButtonClick} sx={{
        width: "100%",
        height: "100%"
    }}>
        <input type="file" disabled={disabled} hidden ref={fileInputRef} accept="image/jpeg" onChange={(e) => handleChange(e.target.files?.item(0) ?? null)}/>
    </CardActionArea>
}

interface CharacterUploadImageProps {
    base64Image?: string
    setImage: (base64Image: string | undefined) => void;
}

export default function CharacterUploadImage({base64Image, setImage} : CharacterUploadImageProps) {
    const theme = useTheme();

    return <CharacterImage
        height="25vh"
        base64Image={base64Image}
        noImageIconOverride={<AddIcon style={{color: theme.palette.grey.A100}}/>}
        imageOverlayChildren={
            base64Image ? <DeleteImageOverlay deleteImage={() => setImage(undefined)} /> 
            : <AddImageOverlay addImage={(image) => setImage(image)}/>
        }
    />
}