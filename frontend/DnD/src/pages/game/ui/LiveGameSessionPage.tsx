import { ShortCharacterInfo } from "@/entities/character";
import CharacterCard from "@/entities/character/ui/characterCard";
import CharacterPersonalityDescription from "@/entities/character/ui/characterPersonalityDescription";
import { CharacterControlBar } from "@/widgets/game";
import { Button, Card, CardContent, Stack } from "@mui/material";

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

    const buttonBar = <CharacterControlBar />
     

    return <div>
            <CharacterCard characterInfo={character} cardActions={buttonBar}>
            </CharacterCard>
    </div>
}