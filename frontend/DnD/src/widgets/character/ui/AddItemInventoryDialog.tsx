import { AddItemToInventoryForm, ExpandedInventoryItem } from "@/features/inventory";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface AddItemInventoryDialogProps {
    show: boolean;
    close: () => void;
    onItemAdd: (item: ExpandedInventoryItem) => void
}

export default function AddItemInventoryDialog({show, close, onItemAdd}: AddItemInventoryDialogProps) {

    return (
        <Dialog 
            open={show}
            maxWidth="xs"
            fullWidth={true}
            scroll="body"
        >
            <DialogTitle display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" component="div">
                    Добавить в инветарь
                </Typography>
                <IconButton onClick={close}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <AddItemToInventoryForm onItemSubmit={onItemAdd} submitButtonText="Добавить" />
            </DialogContent>
        </Dialog>
    )
}