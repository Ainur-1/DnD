import useGameReducer from "@/features/game"
import BottomControlBar from "./gameControls";
import { FlexCarousel } from "@/shared/ui/Carousel";
import { GameCharacter } from "@/features/game/model/types";
import { CharacterCard } from "@/entities/character";
import { InGameLiveOverlay } from "@/entities/character/ui/characterCardTopOverlays";
import CharacterControlBar from "./characterControl";
import { Box } from "@mui/material";

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

    return <Box position="relative" width="100%" height="100%">
        <FlexCarousel items={items} constructNode={constructCharacterCard}/>
        <Box sx={{transform: "translateY(35%)"}}>
            <BottomControlBar findMyCharacter={navigateCarouselToMyCharacter} />
        </Box>
    </Box>
}