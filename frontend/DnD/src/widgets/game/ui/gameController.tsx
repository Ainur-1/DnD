import useGameReducer from "@/features/game"
import BottomControlBar from "./gameControls";
import Carousel from "@/shared/ui/Carousel";
import { GameCharacter } from "@/features/game/model/types";
import { CharacterCard } from "@/entities/character";


export default function GameController() {
    const { state } = useGameReducer();

    const items = state.gameInfo.partyCharacters;


    const openMyCharacterInvetory = () => {

    };

    const navigateCarouselToMyCharacter = () => {

    };

    const handleFightClick = () => {

    };

    function constructCharacterCard(character: GameCharacter, _: number) {
        return <CharacterCard characterInfo={character.personality}/>
    }

    return <>
        <Carousel items={items} constructNode={constructCharacterCard}>
        </Carousel>
        <BottomControlBar 
            handleFightButtonClick={handleFightClick} 
            findMyCharacter={navigateCarouselToMyCharacter} 
            openInventory={openMyCharacterInvetory}
        />
    </>
}