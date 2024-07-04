import ChangePageTitle from "@/shared/ui/changePageTitle";
import Tabs from "@/shared/ui/Tabs";
import UncompletedSessionsPage from "./UncompletedSessionsPage";
import NewPartyPage from "./NewPartyPage";

export default function PartiesPage() {

    const tabs = [
        {
            label: "Новый отряд",
            tabPanelChildren: <NewPartyPage/>
        },
        {
            label: "Мои отряды",
            tabPanelChildren: <UncompletedSessionsPage />
        },
    ];

    return <>
        <ChangePageTitle title="Отряды"/>
        <Tabs tabName="Parties" ariaLabel="partiesSelector" tabs={tabs} />
    </>
}