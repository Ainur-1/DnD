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
                {data && data.myCharacters.length > 0 && <Carousel items={data.myCharacters.map(x => {
                    return {
                        characterName: x.personality.name, 
                        characterRace: x.personality.race, 
                        characterClass: x.personality.class, 
                        characterLevel: x.personality.level, 
                        characterImageBase64: x.personality.base64Image,
                        id: x.id,
                        canBeUpdated: x.personality.canLevelUp,
                        isDead: x.isDead,
                        isInParty: x.isInParty
                    };
                })} constructNode={getCarouselCard} />}
                {!data || data.myCharacters.length == 0 && <AbsoluteCenterContent>
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