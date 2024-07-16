import { DeathSaves } from "@/entities/character/model/types";
import { useAuthReducer } from "@/features/auth";
import { useLazyDeathSavesQuery } from "@/features/character/api/api";
import useGameReducer from "@/features/game";
import { useLazyPartyQuery } from "@/features/party";
import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"

enum Progress {
    startLoad = 7,
    partyInfoLoaded = 35,
    partyParsed = 45,
    deathSavesFetchStart = 50,
    deathSavesLoaded = 60,
    startInit = 75,
    completed = 100
}

interface GameLoaderProps {
    partyId: string | undefined,
    onLoaded: () => void,
    onFailure: (error?:string) => void,
}

export default function GameLoader({partyId, onLoaded, onFailure}: GameLoaderProps) {

    const [progress, setProggress] = useState(0);
    const [inGameCharacter, setInGameCharacter] = useState<{
        __typename?: "PartyCharacterDto";
        characterName: string;
        id: any;
    } | null | undefined>(undefined);
    const [isUserGameMaster, setIsUserGameMaster] = useState<boolean | null | undefined>(undefined);
    const [deathSaves, setDeathSaves] = useState<DeathSaves | null | undefined>(undefined);


    const { initGameState, reset } = useGameReducer();
    const { state:authState } = useAuthReducer();

    const [fetchParty, {data:partyData, isFetching:isPartyFetching, isError: isPartyError, isSuccess:isPartySuccess}] = useLazyPartyQuery();
    const [fetchDeathSaves, {data:deathSavesData, isFetching:isDeathSavesFetching, isError: isDeathSavesError, isSuccess:isDeathSavesSuccess}] = useLazyDeathSavesQuery();

    const notifyProgress = (progress: number) => setProggress(progress);

    useEffect(() => {
        if(isPartyFetching) {
            return;
        }

        if (isPartyError) {
            onFailure("Не удалось загрузить отряд.");
            return;
        }

        if (isPartySuccess) {
            notifyProgress(Progress.partyInfoLoaded);
            const { gameMasterId } = partyData.party;
            const character = partyData.party.inGameCharacter;
            setIsUserGameMaster(authState.currentUserId === gameMasterId);
            setInGameCharacter(character ?? null);
            notifyProgress(Progress.partyParsed);

            return;
        }

    }, [isPartyFetching, isPartyError, isPartySuccess, partyData]);

    useEffect(() => {
        if (isUserGameMaster == undefined || inGameCharacter === undefined)
            return;

        notifyProgress(Progress.deathSavesFetchStart);
        if (!isUserGameMaster) {
            if (!inGameCharacter) {
                onFailure();
                return;
            }
            
            fetchDeathSaves({ characterId: inGameCharacter.id });
        } else {
            setDeathSaves(null);
        }
    }, [isUserGameMaster, inGameCharacter]);

    useEffect(() => {
        if (progress != Progress.deathSavesFetchStart)
            return;

        if (isUserGameMaster) {
            setDeathSaves(null);
            notifyProgress(Progress.deathSavesLoaded);
            return;
        } 

        if (isDeathSavesFetching)
            return;

        if (isDeathSavesError) {
            onFailure();
            return;
        }

        if (isDeathSavesSuccess) {
            const stats = deathSavesData.character.dynamicStats;
            if (!stats) {
                onFailure();
                return;
            }
            const { isDead, isDying, deathSaves:dS } = stats!;

            const deathSaves = !isDead && isDying && dS != null ? {
                successCount: dS.successCount,
                failureCount: dS.failureCount
            } : null;

            setDeathSaves(deathSaves);
            notifyProgress(Progress.deathSavesLoaded);
        }

    }, [deathSavesData, isDeathSavesFetching, isDeathSavesError, isDeathSavesSuccess, progress]);

    useEffect(() => {
        if (progress == Progress.completed) 
            onLoaded();
    }, [progress]);

    useEffect(() => {
        if (deathSaves === undefined || partyId == undefined)
            return;

        notifyProgress(Progress.startInit);
        (async () => {
            const initResult = await initGameState({
                isUserGameMaster: isUserGameMaster!,
                partyId: partyId,
                userCharacterId: inGameCharacter?.id,
                deathSaves: deathSaves ?? undefined,
            });

            if (!initResult) {
                onFailure();
                return;
            } else {
                notifyProgress(Progress.completed);
            }
        })();

    }, [deathSaves]);

    function startLoad() {
        if (partyId === undefined) {
            onFailure("Отряд не найден.");
            return;
        }
        notifyProgress(Progress.startLoad);
    
        fetchParty({partyId});
    }

    useEffect(() => {
        reset();
        startLoad();
    }, []);

    return <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate"  value={progress} />
        <Box sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography
                variant="caption"
                component="div"
                color="text.secondary">
                    {`${Math.round(progress)}%`}
            </Typography>
        </Box>
    </Box>
}
