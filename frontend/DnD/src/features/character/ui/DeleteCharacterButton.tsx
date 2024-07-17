import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useState } from "react"
import { useDeleteMyCharacterMutation } from "../api/api";

interface DeleteCharacterButtonProps extends ButtonProps {
    characterDisplayName: string;
    characterId: string;
}

export default function DeleteCharacterButton(props: DeleteCharacterButtonProps) {
    const [showAlert, setShowAlert] = useState(false);
    const [deleteMyCharacter, {isLoading, isSuccess, error}] = useDeleteMyCharacterMutation();

    const openAlert = () => setShowAlert(true);

    const closeAlert = () => setShowAlert(false);

    async function handleDelete() {
        if (isLoading) {
            return;
        }

        await deleteMyCharacter(props.characterId);

        if (isSuccess) {
            closeAlert();
        } else {
            alert("Не удалось удалить персонажа!");
            if(error){
                console.log("Error while deleting character {characterId}: {error}", props.characterId, error);
            }
        }
    }

    return <>
        <Button
            variant="outlined"
            {...props}
            onClick={openAlert}
        >
            Удалить
        </Button>
        <Dialog open={showAlert} onClose={() => {}} 
            aria-labelledby="delete-character-dialog-title" 
            aria-describedby="delete-character-dialog-description">
            <DialogTitle id="delete-character-dialog-title">
                {`Удалить персонажа ${props.characterDisplayName}?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-character-dialog-description">
                    После удаления персонаж станет не доступным, Вы потеряете его навсегда.
                    <br/>
                    Вы действительно хотите его удалить?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disabled={isLoading} color="error" onClick={handleDelete}>Удалить</Button>
                <Button disabled={isLoading} color="success" onClick={closeAlert} autoFocus>
                    Не удалять
                </Button>
            </DialogActions>
      </Dialog>
    </>
}