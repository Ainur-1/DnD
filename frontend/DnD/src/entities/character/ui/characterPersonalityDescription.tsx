import { Stack } from "@mui/material";
import { CharacterPersonalityAdditions } from "../model/types";
import TraitDescription from "@/shared/ui/TraitDescription";

interface CharacterPersonalityDescriptionProps {
    personality: CharacterPersonalityAdditions

}


export default function CharacterPersonalityDescription({
    personality,
}: CharacterPersonalityDescriptionProps) {
    const { 
       age,
       aligment,
       background,
       bonds,
       classFeatures,
       flaws,
       languages,
       otherTraits,
       raceTraits, 
    } = personality;

    return <Stack>
        <TraitDescription title="Возраст" description={age.toString()}/>
    </Stack>
}