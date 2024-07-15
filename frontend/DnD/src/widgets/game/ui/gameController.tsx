import useGameReducer from "@/features/game"
import BottomControlBar from "./gameControls";
import Carousel from "@/shared/ui/Carousel";
import { GameCharacter } from "@/features/game/model/types";
import { CharacterCard } from "@/entities/character";
import { InGameLiveOverlay } from "@/entities/character/ui/characterCardTopOverlays";
import CharacterControlBar from "./characterControl";

export default function GameController() {

    const { state } = useGameReducer();

    if (!state) {
        return <></>
    }

    const items = state.gameInfo.partyCharacters;

    const navigateCarouselToMyCharacter = () => {

    };

    const showCharacterInfo = (_: string) => {
        
    } 

    function constructCharacterCard(character: GameCharacter, _: number) {

        const {
            hp,
            tempHp, 
            armorClass, 
            speed
        } = character.mainStats;
        const { proficiencyBonus, initiativeModifier} = character.otherStats;

        const Overlay = () => <InGameLiveOverlay 
            hp={hp} 
            tempHp={tempHp} 
            armor={armorClass} 
            initiativeBonus={initiativeModifier} 
            proficiencyBonus={proficiencyBonus} 
            speed={speed} 
            showCharacterInfo={() => showCharacterInfo(character.id)} />

        return <CharacterCard 
            characterInfo={character.personality} 
            imageOverlayChildren={<Overlay/>}
            cardActions={<CharacterControlBar 
                    characterId={character.id} 
                />}
            />
    }

    return <>
        <Carousel items={items} constructNode={constructCharacterCard}>
        </Carousel>
        <BottomControlBar 
            findMyCharacter={navigateCarouselToMyCharacter} 
        />
    </>
}