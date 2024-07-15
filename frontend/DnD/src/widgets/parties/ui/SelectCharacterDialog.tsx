import { useMyAliveCharactersQuery } from "@/features/character";
import { QuestionMark } from "@mui/icons-material";
import { Avatar, Box, Button, CircularProgress, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SelectCharacterDialogProps {
    onClose: (charcaterId: string | undefined) => void;
    open: boolean;
}

export default function SelectCharacterDialog({open, onClose}:SelectCharacterDialogProps) {
    const { data, isFetching, isError, refetch, error } = useMyAliveCharactersQuery();
    let refetchCount = 0; 

    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isError) {
            return;
        }

        if (refetchCount < 3) {
            refetchCount++;
            refetch();
        } else {
            onClose(undefined);
      }
    }, [isError, refetch, error]);

    return (
        <Dialog onClose={() => onClose(undefined)} open={open}>
        <DialogTitle>Выберите персонажа</DialogTitle>
        <List sx={{ pt: 0 }}>
          {data?.myCharacters.map(({id, personality}) => (
            <ListItem disableGutters key={id}>
              <ListItemButton onClick={() => onClose(id)}>
                <ListItemAvatar>
                  <Avatar src={personality.base64Image ? `data:image/jpeg;base64;${personality.base64Image}` : undefined} 
                          sx={{ bgcolor: 'white', color: theme.palette.primary.main }}>
                    {!personality.base64Image && <QuestionMark />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={personality.name} />
              </ListItemButton>
            </ListItem>
          ))}
          { !isFetching && data?.myCharacters.length == 0 && <Box display="flex" alignItems="center" justifyContent="center">
            <Button onClick={() => navigate('/my-characters/create')}>Создайте персонажа</Button>
          </Box>}
          { isFetching && <ListItem>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress />
                </Box>
            </ListItem>}
        </List>
      </Dialog>
    );
}