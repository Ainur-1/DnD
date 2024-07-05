import { Grid } from "@mui/material";
import { useLazyRaceInfoQuery, useStrictRacesQuery } from "../api/api";
import { useState } from "react";
import { Race, RaceInfo } from "@/entities/races";
import { StringSelector } from "@/shared/ui/GenericSelector";

interface RaceSelectorProps {
    onRaceSelected: (race: Race) => void
}

export default function RaceSelector({onRaceSelected}: RaceSelectorProps) {
    const { data: strictRaces } = useStrictRacesQuery();
    const [raceInfo] = useLazyRaceInfoQuery();

    const [tempRace, setTempRace] = useState<RaceInfo | undefined>();
    const [raceDisabled, setRaceDisabled] = useState(false);

    const onRaceSelect = async (id: string) => {
        setRaceDisabled(true);
        setTempRace(undefined);
        try {
            const response = await raceInfo(id);
            if (response.isSuccess && response.data.success) {
                const info = response.data.data;
                if (info?.subraces && info.subraces.length > 0) {
                    setTempRace(info);
                } else {
                    const race = {
                        id,
                        name: info!.name,
                    };
                    onRaceSelected(race);
                }
            } else {
                //todo: handle errors
                console.log("Fatal error. No connection or whatever.");
                setTempRace(undefined);
            }
        } finally {
            setRaceDisabled(false);
        }
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

    return <Grid container>
        <Grid item xs={6}>
            <StringSelector
                disabled={raceDisabled} 
                selectorLabel="Раса" 
                id="race" 
                values={strictRaces?.data ? [] : strictRaces!.data!.map(x => {
                    return {
                        label: x.name,
                        value: x.id
                    };
                })} 
                onValueChange={onRaceSelect} />
        </Grid>
        <Grid item xs={6}>
            { tempRace && <StringSelector 
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
    </Grid>
}