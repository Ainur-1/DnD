import { ShortCharacterInfo } from "@/entities/character";
import CharacterCard from "@/entities/character/ui/characterCard";
import CharacterPersonalityDescription from "@/entities/character/ui/characterPersonalityDescription";
import { CharacterControlBar } from "@/widgets/game";
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

    return <div>
            <CharacterCard characterInfo={character} >
            </CharacterCard>
            <Container>
                <UserControlBar findMeButtonInfo={{onClick: () => {}}} ineventoryButtonInfo={{onClick: () => {}}} />
                <DeadUserControlBar failuresCount={0} successCount={0} changeSuccessCount={(v) => {}} changeFailuresCount={(v) => {}} />
                <GameMasterControlBar fightButtonInfo={{children: title, onClick: () => {}} } />
            </Container>
    </div>
}