import { Button, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const CharacterNameLoadingSkeletone = () => <Skeleton sx={{ fontSize: '0.8rem' }} width="20vw" animation="wave" />

interface UncompletedSessionWrapProps {
    leftNode: ReactNode,
    rightNode: ReactNode,
    alignRightToEnd?: boolean
}

function UncompletedSessionWrap({leftNode, rightNode, alignRightToEnd = false}: UncompletedSessionWrapProps) {

    return <Paper elevation={2} sx={{ 
        display: 'flex',
        justifyContent: "space-between", 
        paddingTop: 1, 
        paddingBottom:1, 
        paddingRight: 2.5, 
        paddingLeft: 2.5, 
        minWidth: "70vw" 
    }}>
    <Stack alignItems="flex-start" justifyContent="space-between">
        {leftNode}
    </Stack>
    <Stack alignItems="flex-end" justifyContent={ alignRightToEnd ? "flex-end" : "space-between" }>
        {rightNode}
    </Stack>
</Paper>
}

export function UncompletedSessionCardSkeletone() {

    return <UncompletedSessionWrap 
        leftNode={<>
            <Skeleton width="25vw" animation="wave" />
            <Skeleton sx={{ fontSize: '0.65rem' }}  width="10vw" animation="wave" />
        </>} 
        rightNode={<>
            <CharacterNameLoadingSkeletone />
            <Skeleton width="15vw" animation="wave" />
        </>}
    />
}

interface UncompletedSessionCardProps {
    code: string,
    partyId: string,
    isUserPartyCreator: boolean,
    mayBeInGameCharacterName: string | null,
}

export default function UncompletedSessionCard({ code, partyId, isUserPartyCreator, mayBeInGameCharacterName }: UncompletedSessionCardProps) {
    const navigate = useNavigate();

    return <UncompletedSessionWrap 
            alignRightToEnd = {mayBeInGameCharacterName == null}
            leftNode={<>
                <Typography component="div" variant="h6">
                    {code}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {isUserPartyCreator ? 'Гейм-мастер' : 'Игрок'}
                </Typography>
            </>} 
            rightNode={<>
                        {mayBeInGameCharacterName}
                        <Button
                                onClick={() => navigate(`/game/${partyId}`)} 
                                sx={{
                                    padding: 0
                                }}>
                                Войти
                        </Button>
                     </>}
            />
}