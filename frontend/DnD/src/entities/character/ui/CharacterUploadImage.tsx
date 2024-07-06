import { MuiFileInput } from "mui-file-input";
import { CharacterImage } from "./CharacterImage";
import { useRef, useState } from "react";
import { convertFileToBase64 } from "@/shared/utils/fileConverter";
import { Box, CardActionArea, IconButton } from "@mui/material";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

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

    const [error, setError] = useState<boolean>(false);
    const [disabled, setDisabled] = useState(false);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
      };

    const handleChange = async (e: File | null) => {
        if (e == null) {
            return;
        }

        if (!e.type.startsWith("image/jpeg")) {
            setError(true);
            return;
        } else if (e.size > 3 * 1024 * 1024) {
            setError(true);
            alert("Файл слишком большой. Не более 3 мб.");
            return;
        }

        setError(false);
        setDisabled(true);
        try {
            const base64 = await convertFileToBase64(e);
            addImage(base64);
        } catch {
            setError(true);
            alert("Не удалось загурзить изображение.");
        } finally {
            setDisabled(false);
        }
    };

    return <CardActionArea onClick={handleButtonClick} sx={{
        width: "100%",
        height: "100%"
    }}>
        <input type="file" hidden ref={fileInputRef} accept="image/jpeg" onChange={(e) => handleChange(e.target.files?.item(0) ?? null)}/>
    </CardActionArea>
}

interface CharacterUploadImageProps {
    base64Image?: string
    setImage: (base64Image: string | undefined) => void;
}

export default function CharacterUploadImage({base64Image, setImage} : CharacterUploadImageProps) {

    return <CharacterImage 
        base64Image={base64Image}
        imageOverlayChildren={
            base64Image ? <DeleteImageOverlay deleteImage={() => setImage(undefined)} /> 
            : <AddImageOverlay addImage={(image) => setImage(image)}/>
        }
    />
}