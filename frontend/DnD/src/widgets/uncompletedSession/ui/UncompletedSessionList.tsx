import { List, ListItem } from "@mui/material";
import UncompletedSessionCard, { UncompletedSessionCardSkeletone } from "./UncompletedSessionCard";

interface UncompletedSessionCardListProps {
}

export default function UncompletedSessionList({}: UncompletedSessionCardListProps) {

    //todo: get parties
    const length = 12;
    const data = [{ code: "Q123Uty", partyId: "dsgdfgddf", isUserPartyCreator: true, maybeChracaterName: "Персонвж" },
        { code: "Q123Uty", partyId: "dsgdfgddf", isUserPartyCreator: true, maybeChracaterName: "Персонвж" },
        { code: "Q123Uty", partyId: "dsgdgddf", isUserPartyCreator: true, maybeChracaterName: "Персонвж" },
        { code: "Q123Uty", partyId: "dsfgddf", isUserPartyCreator: true, maybeChracaterName: "Персонвж" },
        { code: "Q123Uty", partyId: "dfgddf", isUserPartyCreator: true, maybeChracaterName: "Персонвж" },
        { code: "Q123Uty", partyId: "dsgdf", isUserPartyCreator: true, maybeChracaterName: "Персонвж" },
        { code: "Q123Uty", partyId: "dfgd33df", isUserPartyCreator: true, maybeChracaterName: "Персонвж" },
        { code: "Q123Uty", partyId: "d4343ddf", isUserPartyCreator: true, maybeChracaterName: "Персонвж" },
        { code: "Q123Uty", partyId: "ds56655gddf", isUserPartyCreator: true, maybeChracaterName: "Персонвж" },
        { code: "Q123Uty", partyId: "ds565gddf", isUserPartyCreator: true, maybeChracaterName: "Персонвж" },
        { code: "Q123Uty", partyId: "dsgd56565", isUserPartyCreator: true, maybeChracaterName: "Персонвж" },
        { code: "Q123Uty", partyId: "dsgd565656df", isUserPartyCreator: true, maybeChracaterName: "Персонвж" },
    ];

    return <List>
        {data.map(x => <ListItem key={x.partyId}>
            <UncompletedSessionCardSkeletone />
        </ListItem>)}
    </List>
}