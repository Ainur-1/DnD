import useGameReducer from "@/features/game"
import BottomControlBar from "./gameControls";
import Carousel from "@/shared/ui/Carousel";
import { GameCharacter } from "@/features/game/model/types";
import { CharacterCard } from "@/entities/character";
import { InGameLiveOverlay } from "@/entities/character/ui/characterCardTopOverlays";
import CharacterControlBar from "./characterControl";
import { Box, Stack } from "@mui/material";
import FightStatusWidget from "./FightStatusWidget";
import { useRef } from "react";

export default function GameController() {
    const updateIndexRef = useRef<(index: number) => void>(() => {});
    const { state } = useGameReducer();

    if (!state) {
        return <></>
    }

    const { userCharacterId, partyCharacters } = state.gameInfo;

    const navigateCarouselToMyCharacter = () => {
        if (state.isUserGameMaster || !userCharacterId)
            return;

        const myIndex = partyCharacters.findIndex(x => x.id == userCharacterId);
        
        if (myIndex != -1 && updateIndexRef.current) {
            updateIndexRef.current(myIndex);
        }
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
        <Stack>
            <Carousel items={partyCharacters} constructNode={constructCharacterCard} 
            setActiveStepRequestCallback={(callback) => (updateIndexRef.current = callback)}/>
        </Stack>
        <FightStatusWidget/>
        <Box sx={{transform: "translateY(35%)"}}>
            <BottomControlBar findMyCharacter={navigateCarouselToMyCharacter} />
        </Box>
    </Box>
}