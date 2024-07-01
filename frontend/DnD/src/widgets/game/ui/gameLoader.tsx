import useGameReducer from "@/features/game";
import { GameCharacter, GameState } from "@/features/game/model/types";
import { HUB_URL } from "@/shared/configuration/enviromentConstants";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { CircularProgress } from "@mui/material"
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

    const notifyProgress = (progress: number) => setProggress(progress);


    async function load() {
        if (!partyId) {
            onFailure();
        }
        notifyProgress(3);

                //todo: get info from partyId,
        notifyProgress(33);
        // get character
        const userIsGameMaster = false;
        const accessCode = "650-065";
        const characterId = "sdfsfs";
        const inGameCharacters: GameCharacter[] = [];
        try{
            const connection = await openConnection();
            notifyProgress(70);
            const roomState = await connection.invoke<GameState | null>("JoinRoom", partyId, accessCode);
            notifyProgress(85);
            const initialState: GameState = {
                connection: connection,
                isUserGameMaster: userIsGameMaster,
                partyId: partyId as string,
                roomCode: accessCode,
                gameInfo: {
                    userCharacterId: characterId,
                    partyCharacters: inGameCharacters,
                    isFighting: false,
                },
                fatalErrorOccured: false
            };
            init(initialState);
            
            notifyProgress(100);
        } catch {
            onFailure();
        }
        onLoaded();
    }

    useEffect(() => {
        reset();
        load();
    }, []);

    return <CircularProgress variant="determinate" value={progress} />
}
