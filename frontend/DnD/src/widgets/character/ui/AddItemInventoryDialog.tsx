import { AddItemToInventoryForm, ExpandedInventoryItem } from "@/features/inventory";
import { Container, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
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
            <DialogTitle display="inline-flex" justifyContent="space-between">
                <Typography variant="h4" component="div">
                    Добавить в инветарь
                </Typography>
                <Container>
                    <IconButton onClick={close}>
                        <CloseIcon />
                    </IconButton>
                </Container>
            </DialogTitle>
            <DialogContent>
                <AddItemToInventoryForm onItemSubmit={onItemAdd} />
            </DialogContent>
        </Dialog>
    )
}