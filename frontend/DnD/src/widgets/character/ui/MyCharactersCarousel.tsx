import { CarouselCardOverlay, CharacterCard, CharacterCardSkeletone } from "@/entities/character"
import { CarouselCharacter, DeleteCharacterButton, useMyCharactersQuery } from "@/features/character";
import Carousel from "@/shared/ui/Carousel"
import ErrorWithRetryButton from "@/shared/ui/ErrorWithRetryButton";
import { Box, Button, Stack } from "@mui/material";
import { AbsoluteCenterContent } from "@/shared/ui/AbsoluteSenterContent";

interface CharacterCardActionsProps {
    chracterId: string,
    characterDisplay: string
}
const CharacterCardActions = ({chracterId, characterDisplay}: CharacterCardActionsProps) => <>
    <DeleteCharacterButton sx={{width: "50%"}} characterId={chracterId} characterDisplayName={characterDisplay} />
    <Button sx={{width: "50%"}} variant="outlined">Редактировать</Button>
</>

function getCarouselCard(item: CarouselCharacter) {

    const { 
        characterName, 
        characterRace, 
        characterClass, 
        characterLevel, 
        characterImageBase64,
        id,
        canBeUpdated,
        isDead,
        isInParty
    } = item;

    const characterInfo = {
        characterName,
        characterRace,
        characterClass,
        characterLevel,
        characterImageBase64,
    };

    return <Box display="flex" justifyContent="center">
        <CharacterCard 
            key={id}
            characterInfo={characterInfo} 
            imageOverlayChildren={<CarouselCardOverlay 
                showDeadIcon={isDead} 
                showInPartyLabel={isInParty} 
                showCanUpdateIcon={canBeUpdated}/>
            }
            cardActions={<CharacterCardActions 
                chracterId={id} 
                characterDisplay={`'${characterName}' (${characterRace})`
                }
            />}
        />
    </Box>
} 

export function MyCharactersCarousel() {
    const { data, isFetching, isSuccess, isError, refetch } = useMyCharactersQuery();

    return <Stack>
            {isSuccess && <>
                {data && data.length > 0 && <Carousel items={data!} constructNode={getCarouselCard} />}
                {!data || data.length == 0 && <AbsoluteCenterContent>
                        У вас нет персонажей
                    </AbsoluteCenterContent>}
            </>}
            {isFetching && <Carousel items={["empty"]} 
                constructNode={(_, index) => <Box key={index} display="flex" justifyContent="center">
                    <CharacterCardSkeletone/>
                </Box>}/>}
            {isError && <AbsoluteCenterContent>
                    <ErrorWithRetryButton onRetryClicked={refetch}/>
                </AbsoluteCenterContent>
            }
        </Stack>
}