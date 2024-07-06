import { Divider, Grid, Stack, Typography } from "@mui/material";
import TraitDescription, { TraitMultilineDescription } from "@/shared/ui/TraitDescription";
import { ReactChildrenProps } from "@/shared/types/reactChildrenProps";
import { ClassFeature, RaceTrait } from "@/shared/types/domainTypes";
import AccordionList from "@/shared/ui/AccordionList";
import { PersonalityAdditions } from "../model/types";

const GridContainer = ({children}: ReactChildrenProps) => <Grid container spacing={2}>{children}</Grid>

interface AgeGridProps {
    age: string
}

function AgeGrid({age}: AgeGridProps) {

    return <GridContainer>
        <TraitDescription title="Возраст" description={age}/>
    </GridContainer>
}

interface TraitsGridProps {
    raceTraits: RaceTrait[],
    classFeatures: ClassFeature[],
    languages: string[],
    otherTraits: string[],
}

function TraitsGrid({raceTraits, classFeatures, languages, otherTraits}: TraitsGridProps) {

    return <Stack rowGap={2}>
        <Typography>
            Расовые черты
        </Typography>
        <AccordionList uniqueId="raceTraits" accordionValues={raceTraits}/>
        <Typography>
            Классовые возможности
        </Typography>
        <AccordionList uniqueId="classFeatures" accordionValues={classFeatures}/>
        <GridContainer>
            <TraitDescription title="Языки" description={languages.join(", ")}/>
        </GridContainer>
        {
            otherTraits.length > 0 && <>
                <TraitMultilineDescription title="Прочие черты" descriptions={otherTraits}/>
            </>
        }
    </Stack>
}

interface LoreGridProps {
    alignment: string,
    bonds: string[],
    flaws: string[],
    background: string
}

function LoreGrid({alignment, bonds, flaws, background}: LoreGridProps) {

    return <GridContainer>
        <TraitDescription title="Мировоззрение" description={alignment}/>
        {
            bonds.length > 0 &&
                (bonds.length > 3 
                    ? <TraitMultilineDescription title="Привязанности" descriptions={bonds}/>
                    : <TraitDescription title="Привязанности" description={bonds.join(", ")}/>
                )
        }
        {
            flaws.length > 0 &&
                (flaws.length > 3 
                    ? <TraitMultilineDescription title="Слабости" descriptions={flaws}/>
                    : <TraitDescription title="Слабости" description={flaws.join(", ")}/>
                )
        }
        { background && <TraitDescription title="Лор" description={background}/> }
    </GridContainer>
}

interface CharacterPersonalityDescriptionProps {
    personality: PersonalityAdditions
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
        <AgeGrid age={age.toString()}/>
        <Divider style={{
            marginBottom: 5
        }}/>
        <TraitsGrid raceTraits={raceTraits} classFeatures={classFeatures} languages={languages} otherTraits={otherTraits} />
        <Divider style={{
            marginBottom: 5
        }}/>
        <LoreGrid alignment={aligment} background={background} bonds={bonds} flaws={flaws} />
    </Stack>
}
