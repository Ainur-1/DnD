import { DeathSaves } from "@/entities/character/model/types";
import { useLazyDeathSavesQuery } from "@/features/character/api/api";
import useGameReducer from "@/features/game";
import { RoomState } from "@/features/game/model/signalRTypes";
import { GameState } from "@/features/game/model/types";
import { useLazyPartyQuery } from "@/features/party";
import { HUB_URL } from "@/shared/configuration/enviromentConstants";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"

interface GameLoaderProps {
    partyId: string | undefined,
    onLoaded: () => void,
    onFailure: () => void,
}

async function openConnection() {
    const connection = new HubConnectionBuilder()
        .withUrl(HUB_URL)
        .withAutomaticReconnect()
        .build();
    
    await connection.start();

    return connection;
}

export default function GameLoader({partyId, onLoaded, onFailure}: GameLoaderProps) {
    const [progress, setProggress] = useState(0);
    const { init, reset } = useGameReducer();

    const [party] = useLazyPartyQuery();
    const [deathSaves] = useLazyDeathSavesQuery();

    const notifyProgress = (progress: number) => setProggress(progress);

    const fetchParty = (partyId: string) => party(partyId)
        .unwrap()
        .then(x => x)
        .catch(() => null);
    
    const fetchDeathSaves = (characterId: string) => deathSaves(characterId)
        .unwrap()
        .then(x => x)
        .catch(() => null);

    async function load() {
        try{
            if (partyId === undefined) {
                onFailure();
                return;
            }
            notifyProgress(7);
    
            const response = await fetchParty(partyId!);
            if (response === null) {
                onFailure();
                return;
            }
            notifyProgress(25);
    
            const { code, isUserGameMaster, userCharacterId } = response;
            const connection = await openConnection();
            notifyProgress(58);
    
            let deathSaves: DeathSaves | undefined;
            if (!isUserGameMaster) {
                if (userCharacterId == null) {
                    onFailure();
                    return;
                }
    
                const response = await fetchDeathSaves(userCharacterId);
                notifyProgress(66);
                if (response == null) {
                    onFailure();
                    return;
                }
    
                deathSaves = response.isDying ? {
                    successCount: response.failureCount,
                    failureCount: response.successCount
                } : undefined;
            }
            notifyProgress(75);
    
            const state = await connection.invoke<RoomState | null>("JoinRoom", partyId, code);
            notifyProgress(85);
    
            if (state === null) {
                onFailure();
                return;
            }
            notifyProgress(95);
    
            const initialState: GameState = {
                partyId: partyId!,
                roomCode: code,
                isUserGameMaster,
                fatalErrorOccured: false,
                connection,
                gameInfo: {
                    userCharacterId,
                    partyCharacters: state.characters,
                    isFighting: state.isFighting,
                    characterStepOrder: state.order ?? undefined,
                    deathSaves
                },
            }

            init(initialState);
            notifyProgress(100);
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
