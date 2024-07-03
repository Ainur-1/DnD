import ChangePageTitle from "@/shared/ui/changePageTitle";
import { GameController, GameLoader } from "@/widgets/game";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function LiveGameSessionPage() {
   const { partyId } = useParams();
   const [isLoaded, setIsLoaded] = useState(false);
   const [failure, setFailure] = useState(false);

   const reset = () => {
      setFailure(false);
      setIsLoaded(false);
   };

   const onFailure = () => {
      setFailure(true);
      setIsLoaded(true);
   }

   const onSuccess = () => {
      setFailure(false);
      setIsLoaded(true);
   }

   return <>
      <ChangePageTitle title="Отряд"/>
      <Container>
         <Box
           sx={{
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             justifyContent: 'center',
             minHeight: '100vh',
           }}
         >
            {!isLoaded && <GameLoader onFailure={onFailure} onLoaded={onSuccess} partyId={partyId} />}
            {isLoaded && <>
               {!failure && <GameController/>}
               {failure && <Stack sx={{alignItems:"center", justifyContent:"center"}}>
                     <Typography margin="dense">
                        Ошибка
                     </Typography>
                     <Button onClick={reset}>
                        Попробовать еще раз
                     </Button>
                  </Stack>
               }
            </>} 
         </Box>
      </Container>
   </>
}