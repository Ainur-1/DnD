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
        const roomCode = "650-065";
        const characterId = "sdfsfs";
        const inGameCharacters: GameCharacter[] = [{
            id: characterId,
            mainStats: {
                armorClass: 15,
                currentHp: 16,
                initiativeModifier: 2,
                inspirationBonus: 0,
                proficiencyBonus: 2,
                speed: 30,
                tempHp: 0
            },
            personality: {
                characterClass: "Воин",
                characterLevel: 1,
                characterName: "Хабиб Муслимов",
                characterRace: "Высший Эльф",
            }
        }];
        try{
            const connection = await openConnection();
            notifyProgress(97);
            const initialState: GameState = {
                connection: connection,
                isUserGameMaster: userIsGameMaster,
                partyId: partyId as string,
                roomCode: roomCode,
                gameInfo: {
                    userCharacterId: characterId,
                    partyCharacters: inGameCharacters,
                    isFighting: false,
                }
            };

            init(initialState);
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
