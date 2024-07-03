import CenterContent from "@/shared/ui/CenterContent";
import ChangePageTitle from "@/shared/ui/changePageTitle";
import ErrorWithRetryButton from "@/shared/ui/ErrorWithRetryButton";
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
      <CenterContent>
         {!isLoaded && <GameLoader onFailure={onFailure} onLoaded={onSuccess} partyId={partyId} />}
         {isLoaded && <>
            {!failure && <GameController/>}
            {failure && <ErrorWithRetryButton errorText="Ошибка" retryButtonText="Загрузить еще раз" onRetryClicked={reset}/>}
         </>} 
      </CenterContent>
   </>
}