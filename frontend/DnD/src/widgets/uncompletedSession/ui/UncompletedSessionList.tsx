import { List, ListItem, Typography } from "@mui/material";
import UncompletedSessionCard, { UncompletedSessionCardSkeletone } from "./UncompletedSessionCard";
import { useMyPartiesQuery } from "@/features/party";
import { AbsoluteCenterContent } from "@/shared/ui/AbsoluteSenterContent";
import ErrorWithRetryButton from "@/shared/ui/ErrorWithRetryButton";
import { useAuthReducer } from "@/features/auth";

function getArrayForSkeletone() {
    const array = [];
    const empty = {};
    for (let i = 0; i < 10; i++){
        array.push(empty);
    }

    return array;
}

interface UncompletedSessionCardListProps {
}

export default function UncompletedSessionList({}: UncompletedSessionCardListProps) {
    const { data, isFetching, isError, isSuccess } = useMyPartiesQuery();
    const { state } = useAuthReducer();

    return <>
        { isError && <AbsoluteCenterContent>
                <ErrorWithRetryButton />
            </AbsoluteCenterContent>
        }
        { !isError && 
            <List>
                {isFetching && getArrayForSkeletone()
                    .map((_, index) => <ListItem key={index}><UncompletedSessionCardSkeletone/></ListItem>)
                }
                {
                    isSuccess && <>
                        {
                            (!data || data.myParties.length == 0) && <Typography>У Вас нет начатых игр.</Typography>
                        }
                        {
                            data && data.myParties.length > 0 && data.myParties.map(({id, accessCode, gameMasterId, inGameCharacter}) => <ListItem>
                                <UncompletedSessionCard 
                                    code={accessCode} 
                                    partyId={id} 
                                    isUserPartyCreator={gameMasterId == state.currentUserId} 
                                    mayBeInGameCharacterName={inGameCharacter?.characterName ?? null} 
                                />
                            </ListItem>)
                        }
                    </>
                }
            </List>
        }
    </>
}
