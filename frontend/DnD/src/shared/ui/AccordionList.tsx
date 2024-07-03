import { Accordion, AccordionDetails, AccordionSummary, SxProps, Theme, Typography } from "@mui/material";
import { NamePlusDescription } from "../types/domainTypes";
import { ExpandMore } from "@mui/icons-material";
import React from "react";

interface AccordionListProps {
    uniqueId: string,
    accordionValues: NamePlusDescription[],
    titleSx?: SxProps<Theme>
    descriptionSx?: SxProps<Theme>
}

export default function AccordionList({uniqueId, accordionValues, titleSx, descriptionSx}: AccordionListProps) {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    return <div id={uniqueId}>
        {accordionValues.map(({name, description}, index) => {
            const i = index + 1;
            const panelId = `${uniqueId}${i}`;
            const summaryId = `${uniqueId}${i}bh-header`
            const ariaControls = `${uniqueId}${i}bh-content`

            return <Accordion key={panelId} expanded={expanded === panelId} onChange={handleChange(panelId)}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={ariaControls}
              id={summaryId}
            >
              <Typography sx={{...titleSx, width: '33%', flexShrink: 0 }}>
                {name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={descriptionSx}>
                {description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        })}
    </div>
}