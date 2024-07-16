import useGameReducer from "@/features/game";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

interface ListItem {
    id: number;
    content: string;
  }
  

const splitItemsIntoColumns = (items: ListItem[], columns: number): ListItem[][] => {
    const columnItems = Array.from({ length: columns }, () => [] as ListItem[]);
    items.forEach((item, index) => {
      columnItems[index % columns].push(item);
    });
    return columnItems;
  };


export default function FightStatusWidget() {
    const columns = 3;
    const {state} = useGameReducer();
    if (!state)
        return <></>

    const { characterStepOrder, partyCharacters } = state.gameInfo;

    const order: ListItem[] | undefined = characterStepOrder
        ?.map(id => partyCharacters.find(x => x.id == id))
        .filter(x => x != undefined)
        .map((x,i) => { return { id: i + 1, content: x.personality.characterName } });

    const columnItems = order ? splitItemsIntoColumns(order!, columns) : undefined;
    
    return (<Stack alignItems="center" marginTop={1.5}>
        {order && <Typography component="h5" fontWeight="bold">Порядок хода</Typography>}
        <Container>
            <Grid container spacing={2}>
                {columnItems?.map((column, columnIndex) => (
                    <Grid item xs={12} sm={6} md={4} key={columnIndex}>
                        <Box>
                            {column.map((item) => (
                                <Box key={item.id} mb={2}>
                                    {item.id}. {item.content}
                                </Box>
                            ))}
                        </Box>
                </Grid>))}
            </Grid>
        </Container>
    </Stack>);
}
