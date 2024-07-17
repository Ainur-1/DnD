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
                                    selectedOption={getSelectedOption(name)}
                                    raceTrait={trait} 
                                    onOptionIndexChange={(index: number | undefined) => setSelectedOption(name, index)} />
                            </ListItem>
                        } )
                    }
                </List>}
            </Container>
        </Stack>}
    </>
}