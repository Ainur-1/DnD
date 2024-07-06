import CharacterBackgroundField from "@/entities/character/ui/CharacterBackgroundField";
import { Stack, Typography } from "@mui/material"
import Grid from "@mui/material/Grid";

interface TraitDescriptionPropsBase {
    title: string,
}

interface TraitDescriptionProps extends TraitDescriptionPropsBase {
    description: string
}


const GridTitle = ({title}: TraitDescriptionPropsBase) => <Grid item xs={4}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold'}}>
            {title}
        </Typography>
    </Grid>


export default function TraitDescription({title, description}: TraitDescriptionProps) {
    return <> 
        <GridTitle title={title}/>
        <Grid item xs={8}>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </Grid>
      </>
}

interface TraitDescriptionMultilineProps extends TraitDescriptionPropsBase {
    descriptions: string[] | string
}

export function TraitMultilineDescription({title, descriptions}: TraitDescriptionMultilineProps) {
    const result = typeof descriptions === 'string' ? descriptions : descriptions.join("; ");
    return <Stack>
        <GridTitle title={title}/>
        <CharacterBackgroundField disabled={true} value={result} />
    </Stack>
}