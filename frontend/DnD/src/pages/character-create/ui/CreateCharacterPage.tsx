import ChangePageTitle from "@/shared/ui/changePageTitle";
import { CreateCharcaterForm } from "@/widgets/character";

export default function CreateCharacterPage() {
    return <>
        <ChangePageTitle title="Создание персонажа" />
        <CreateCharcaterForm />
    </>   
}