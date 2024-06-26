import { ShortCharacterInfo } from "@/entities/character";
import CharacterCard from "@/entities/character/ui/characterCard";
import CharacterPersonalityDescription from "@/entities/character/ui/characterPersonalityDescription";
import InventoryItemCard from "@/entities/item/ui/inventoryItem";
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

         const title = <>Начать бой</>

         const buttonInfo = {
            onClick: () => {},
         }

         const inventoryList = <EquippedItemsList items={[{
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
        ]}  />

    return <div>
            <CharacterCard characterInfo={character} >
            </CharacterCard>
            <Container>
                <UserControlBar findMeButtonInfo={buttonInfo} ineventoryButtonInfo={buttonInfo} characterId={""} />
            </Container>
    </div>
}