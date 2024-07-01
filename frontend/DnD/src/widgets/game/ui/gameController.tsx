import useGameReducer from "@/features/game"
import BottomControlBar from "./gameControls";
import Carousel from "@/shared/ui/Carousel";
import { GameCharacter } from "@/features/game/model/types";
import { CharacterCard } from "@/entities/character";
import { InGameLiveOverlay } from "@/entities/character/ui/characterCardTopOverlays";
import CharacterControlBar from "./characterControl";
import { useState } from "react";
import { HealFormDialog } from "./formDialogs";


export default function GameController() {


    const { state } = useGameReducer();


    const items = state.gameInfo.partyCharacters;


    const openMyCharacterInvetory = () => {

    };

    const navigateCarouselToMyCharacter = () => {

    };

    const handleFightClick = () => {

    };

    const showCharacterInfo = (characterId: string) => {
        
    }

    function constructCharacterCard(character: GameCharacter, _: number) {

        const {
            currentHp, 
            tempHp, 
            armorClass, 
            initiativeModifier, 
            proficiencyBonus, 
            speed
        } = character.mainStats;

        const Overlay = () => <InGameLiveOverlay 
            hp={currentHp} 
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
            handleFightButtonClick={handleFightClick} 
            findMyCharacter={navigateCarouselToMyCharacter} 
            openInventory={openMyCharacterInvetory}
        />
    </>
}