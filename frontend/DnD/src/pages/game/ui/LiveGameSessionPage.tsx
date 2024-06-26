import ChangePageTitle from "@/shared/ui/changePageTitle";
import { GameController, GameLoader } from "@/widgets/game";
import { Container } from "@mui/material";
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

   //todo: get partyid, check if exists, get info, set connection, get character id and then start

   return <>
      <ChangePageTitle title="Отряд"/>
      <Container>
         {!isLoaded && <GameLoader onFailure={onFailure} onLoaded={onSuccess} partyId={partyId} />}
         {isLoaded && <>
            {failure && <GameController/>}
            {!failure && <div>Ошибка{/*todo: обработка ошибки перенаправление на страницу с ошибкой*/}</div>}
         </>
         }
      </Container>
   </>
}