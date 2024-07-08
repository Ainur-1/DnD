import { DeathSaves } from "@/entities/character/model/types";
import { useAuthReducer } from "@/features/auth";
import { useLazyDeathSavesQuery } from "@/features/character/api/api";
import useGameReducer from "@/features/game";
import { useLazyPartyQuery } from "@/features/party";
import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"

interface GameLoaderProps {
    partyId: string | undefined,
    onLoaded: () => void,
    onFailure: (error?:string) => void,
}

export default function GameLoader({partyId, onLoaded, onFailure}: GameLoaderProps) {

    const [progress, setProggress] = useState(0);
    const { initGameState, reset } = useGameReducer();
    const { state:authState } = useAuthReducer();

    const [party] = useLazyPartyQuery();
    const [deathSaves] = useLazyDeathSavesQuery();

    const notifyProgress = (progress: number) => setProggress(progress);

    const fetchParty = (partyId: string) => party({partyId})
        .unwrap()
        .then(x => x)
        .catch(() => null);
    
    const fetchDeathSaves = (characterId: string) => deathSaves({characterId})
        .unwrap()
        .then(x => x)
        .catch(() => null);

    async function load() {
        try{
            if (partyId === undefined) {
                onFailure("Отряд не найден.");
                return;
            }
            notifyProgress(7);
    
            const response = await fetchParty(partyId!);
            if (response === null) {
                onFailure("Отряд не найден.");
                return;
            }
            notifyProgress(25);
    
            const { gameMasterId, inGameCharacter } = response.party;
            const isUserGameMaster = authState.currentUserId === gameMasterId;
        
            notifyProgress(45);
    
            let deathSaves: DeathSaves | undefined;
            if (!isUserGameMaster) {
                if (!inGameCharacter) {
                    onFailure();
                    return;
                }
    
                const response = await fetchDeathSaves(inGameCharacter.id);
                notifyProgress(55);
                if (response == null) {
                    onFailure();
                    return;
                }

                const { isDead, isDying, deathSaves:dS } = response.character.dynamicStats;
    
                deathSaves = !isDead && isDying && dS != null ? {
                    successCount: dS.successCount,
                    failureCount: dS.failureCount
                } : undefined;
            }
            notifyProgress(75);
    
            const initResult = await initGameState({
                isUserGameMaster: isUserGameMaster,
                partyId: partyId,
                userCharacterId: inGameCharacter!.id as string,
                deathSaves: deathSaves,
            });

            if (!initResult) {
                onFailure();
                return;
            } else {
                notifyProgress(100);
            }
        } catch {
            onFailure();
            return;
        }
        onLoaded();
    }

    useEffect(() => {
        reset();
        load();
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
