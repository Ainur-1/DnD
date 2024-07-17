import { Grid } from "@mui/material";
import { useLazyRaceInfoQuery, useStrictRacesQuery } from "../api/api";
import { useEffect, useState } from "react";
import { Race, RaceInfo } from "@/entities/races";
import { StringSelector } from "@/shared/ui/GenericSelector";
import { RaceType } from "@/shared/api/gql/graphql";

interface RaceSelectorProps {
    onRaceSelected: (race: Race) => void;
    value: Race | undefined;
}

export default function RaceSelector({value, onRaceSelected}: RaceSelectorProps) {
    const { data: strictRaces } = useStrictRacesQuery();
    const [raceInfo, {data: raceInfoData, isFetching, isSuccess, isError, error}] = useLazyRaceInfoQuery();

    const [tempRace, setTempRace] = useState<RaceInfo | undefined>();
    const [raceDisabled, setRaceDisabled] = useState(false);

    const onRaceSelect = async (id: string) => {
        setRaceDisabled(true);
        setTempRace(undefined);
        await raceInfo({raceId: id as RaceType});
    };
    
    const onSubraceSelect = (subrace: string) => {
        if (!tempRace) {
            console.log("Temp race was not loaded, but subrace was selected. How?");
            return;
        } else if (tempRace.subraces.includes(subrace)) {
            onRaceSelected({
                id: tempRace.id,
                name: tempRace.name,
                subrace,
            });
        }
    };

    useEffect(() => {
        if(!isFetching) {
            setRaceDisabled(false);
        }
    }, [isFetching])

    useEffect(() => {
        if (isSuccess) {
            if (!raceInfoData) {
                return;
            }
            const info = raceInfoData.raceInfo;

            if (info?.subRacesAdjustments && info.subRacesAdjustments.length > 0) {
                setTempRace({
                    adultAge: info.adultAge,
                    id: info.id,
                    languages: info.languages,
                    name: info.name,
                    raceTraits: info.raceTraits,
                    recommendedAlignmentDescription: info.recommendedAlignmentDescription,
                    size: info.size as string,
                    speed: info.speed,
                    subraces: info.subRacesAdjustments.map(x => x.name),
                });
            } else {
                const race = {
                    id: info.id,
                    name: info!.name,
                };
                onRaceSelected(race);
            }
        } 
    }, [raceInfoData, isSuccess]);

    useEffect(() => {
        if (isError) {
            setTempRace(undefined);
            console.log(error);
        }
    }, [isError]);

    return <>
        <Grid item xs={6}>
            <StringSelector
                disabled={raceDisabled} 
                selectorLabel="Раса" 
                id="race" 
                values={!strictRaces?.races ? [] : strictRaces!.races!.map(x => {
                    return {
                        label: x.name,
                        value: x.id as string
                    };
                })} 
                value={value?.id ?? ''}
                onValueChange={onRaceSelect} />
        </Grid>
        <Grid item xs={6}>
            { tempRace && <StringSelector 
                    value={value?.subrace ?? ''}
                    selectorLabel="Подраса" 
                    id="subrace" 
                    values={tempRace.subraces.map(x => {
                        return {
                            label: x,
                            value: x
                        };
                    })} 
                    onValueChange={onSubraceSelect} />
            }
        </Grid>
    </>
}