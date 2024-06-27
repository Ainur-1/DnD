import useGameReducer from "@/features/game"
import BottomControlBar from "./gameControls";
import Carousel from "@/shared/ui/Carousel";
import { GameCharacter } from "@/features/game/model/types";
import { CharacterCard } from "@/entities/character";
import { InGameLiveOverlay } from "@/entities/character/ui/characterCardTopOverlays";
import CharacterControlBar, { GameMasterCharacterControlBar, RestrictedCharacterControlBar } from "./characterControl";


export default function GameController() {
    const { state } = useGameReducer();

    const items = state.gameInfo.partyCharacters;


    const openMyCharacterInvetory = () => {

    };

    const navigateCarouselToMyCharacter = () => {

    };

    const handleFightClick = () => {

    };

    const suggestItemButton = (characterId: string) => {

    }

    const healButton = (characterId: string) => {

    }

    const hitButton = (characterId: string) => {

    }

    const resurrectButton = (characterId: string) => {

    }

    function getCharacterRelatedButtons(characterId: string) {
        const isGameMaster = state.isUserGameMaster;

        const userCharacterDead: boolean | undefined = undefined;
        const suggestButtonInfo = {
            onClick: () => suggestItemButton(characterId),
            disabled: userCharacterDead,
        }

        const healButtonInfo = {
            onClick: () => healButton(characterId),
            disabled: userCharacterDead
        }

        const hitButtonInfo = {
            onClick: () => hitButton(characterId),
            disabled: userCharacterDead,
        }

        if (isGameMaster) {
            return <GameMasterCharacterControlBar resurrectButtonInfo={{onClick: () => resurrectButton(characterId)}} hitButtonInfo={hitButtonInfo} healButtonInfo={healButtonInfo} suggestButtonInfo={suggestButtonInfo} />
        } else if (state.gameInfo.userCharacterId == characterId) {
            return <CharacterControlBar hitButtonInfo={hitButtonInfo} healButtonInfo={healButtonInfo} />
        }

        return <RestrictedCharacterControlBar suggestButtonInfo={suggestButtonInfo} />
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
            showCharacterInfo={() => alert(character.id)} />

        return <CharacterCard 
            characterInfo={character.personality} 
            imageOverlayChildren={<Overlay/>}
            cardActions={getCharacterRelatedButtons(character.id)}
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