import { List, ListItem, Typography } from "@mui/material";
import UncompletedSessionCard, { UncompletedSessionCardSkeletone } from "./UncompletedSessionCard";
import { useMyPartiesQuery } from "@/features/party";
import { AbsoluteCenterContent } from "@/shared/ui/AbsoluteSenterContent";
import ErrorWithRetryButton from "@/shared/ui/ErrorWithRetryButton";

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
                            (!data || data.length == 0) && <Typography>У Вас нет начатых игр.</Typography>
                        }
                        {
                            data && data.length > 0 && data.map(x => <ListItem>
                                <UncompletedSessionCard code={x.code} partyId={x.id} isUserPartyCreator={x.isUserGameMaster} mayBeInGameCharacterId={x.userCharacterId} />
                            </ListItem>)
                        }
                    </>
                }
            </List>
        }
    </>
}
