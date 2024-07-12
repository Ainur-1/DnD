import { Race } from "@/entities/races";
import { RaceTraitAdjustmentForm, useRaceInfoQuery } from "@/features/races";
import { RaceType } from "@/shared/api/gql/graphql";
import { Container, List, ListItem, Stack, Typography } from "@mui/material";

interface RaceTraitAdjustmentProps {
    race: Race | undefined;
    setSelectedOption: (trait: string, option: number | undefined) => void,
    getSelectedOption: (trait: string) => number | undefined;
}

export default function RaceTraitAdjustment({race, setSelectedOption, getSelectedOption}: RaceTraitAdjustmentProps) {
    const { data, isSuccess } = useRaceInfoQuery({raceId: race?.id as RaceType}, {
        skip: race?.id == undefined
    });

    const setSelectedOptionInternal = (traitName: string, selectedOption: string | undefined) => {
        const optionValue = selectedOption 
            ? data?.raceInfo.raceTraits
                .find(x => x.name === traitName)?.options?.findIndex(x => x === selectedOption) 
            : undefined;
        setSelectedOption(traitName, optionValue);
    }

    const getSelectedOptionIntenal = (traitName: string) => {
        const index = getSelectedOption(traitName);
        if (index == undefined)
            return;

        return data?.raceInfo?.raceTraits.find(x => x.name == traitName)?.options?.[index];
    }

    return <>{isSuccess && !data.raceInfo?.raceTraits.every(x => x.options == undefined || x.options == null || x.options.length == 0) 
        && <Stack>
            <Typography component="div" variant="body2" textAlign="start">
                Вашей расе доступны некоторые вариации. Уточните их или нажмите "Далее".
            </Typography>
            <Container>
                {data && <List>
                    {data.raceInfo.raceTraits
                            .filter(x => x.options != undefined && x.options.length > 0)
                            .map((trait, index) => {
                                const { name } = trait;
                                return <ListItem key={index}>
                                <RaceTraitAdjustmentForm 
                                    raceTrait={trait} 
                                    selectedOption={getSelectedOptionIntenal(name)} 
                                    onOptionChange={(option: string | undefined) => setSelectedOptionInternal(name, option)} />
                            </ListItem>
                        } )
                    }
                </List>}
            </Container>
        </Stack>}
    </>
}