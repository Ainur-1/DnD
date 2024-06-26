import { ShortCharacterInfo } from "@/entities/character";
import CharacterCard from "@/entities/character/ui/characterCard";
import { InGameLiveOverlay } from "@/entities/character/ui/characterCardTopOverlays";
import CharacterPersonalityDescription from "@/entities/character/ui/characterPersonalityDescription";
import InventoryItemCard from "@/entities/item/ui/inventoryItem";
import Carousel from "@/shared/ui/Carousel";
import { CharacterControlBar } from "@/widgets/game";
import EquippedItemsList from "@/widgets/game/ui/equippedItemsList";
import { DeadUserControlBar, GameMasterControlBar, UserControlBar } from "@/widgets/game/ui/gameControls";
import { Button, Card, CardContent, Container, Stack } from "@mui/material";

export default function LiveGameSessionPage() {

    const character = {
        characterName: "Бард Хрон",
        characterRace: "Высший Эльф",
        characterClass: "Воин",
        characterLevel: 2,
    }

    const data = 
        { 
            age: 55,
            aligment: "Трудолюбивый",
            background: "",
            bonds: ["Печенье", "Девушки"],
            classFeatures: [],
            flaws: [],
            languages: ["Русский", "Эльфиский", "Английский"],
            otherTraits: ["gdfgdfgd", "dgdfgdfgfd", "dfgdfgdfgdg"],
            raceTraits: [{
                name: "Темное зрение",
                description: "Видеть в темноте"
            }], 
         };


         const inventoryList =[{
            title: "Молот дварфа",
            count: 2 
         },
         {
            title: "Молот дварфа",
            count: 2 
         },
         {
            title: "Молот дварфа",
            count: 2 
         },
         {
            title: "Молот дварфа",
            count: 2 
         },
         {
            title: "Молот дварфа",
            count: 2 
         },
        ];

        const getNode = (item: {title: string, count: number}, index: number) => {
         return <div key={index}>
            {item.title}
            {item.count}
         </div>
        }

    return <div>
            <Carousel items={inventoryList} constructNode={getNode}>
               
            </Carousel>
            {/*
                           <CharacterCard characterInfo={character} imageOverlayChildren={<InGameLiveOverlay showCharacterInfo={()=>alert()}  hp={5} armor={10} initiativeBonus={2} proficiencyBonus={2} speed={30} tempHp={0}/>} >
                           </CharacterCard>
                           <Container>
                               <UserControlBar findMeButtonInfo={buttonInfo} ineventoryButtonInfo={buttonInfo} characterId={""} />
                           </Container>
            */}

    </div>
}