import CenterContent from "@/shared/ui/CenterContent";
import ChangePageTitle from "@/shared/ui/changePageTitle";
import ErrorWithRetryButton from "@/shared/ui/ErrorWithRetryButton";
import { GameController, GameLoader } from "@/widgets/game";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function LiveGameSessionPage() {
   const { partyId } = useParams();
   const [isLoaded, setIsLoaded] = useState(false);
   const [failure, setFailure] = useState<string>('');

   const reset = () => {
      setFailure('');
      setIsLoaded(false);
   };

   const onFailure = (error: string | undefined) => {
      setFailure(error ?? "Ошибка при загрузке");
      setIsLoaded(true);
   }

   const onSuccess = () => {
      setFailure('');
      setIsLoaded(true);
   }

   return <>
      <ChangePageTitle title="Отряд"/>
      <CenterContent>
         {!isLoaded && <GameLoader onFailure={onFailure} onLoaded={onSuccess} partyId={partyId} />}
         {isLoaded && <>
            {!failure && <GameController/>}
            {failure && <ErrorWithRetryButton errorText={failure} retryButtonText="Загрузить еще раз" onRetryClicked={reset}/>}
         </>} 
      </CenterContent>
   </>
}