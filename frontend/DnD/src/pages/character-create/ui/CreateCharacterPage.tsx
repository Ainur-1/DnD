import { CreateCharcaterForm } from "@/features/character";
import ChangePageTitle from "@/shared/ui/changePageTitle";

export default function CreateCharacterPage() {
    return <>
        <ChangePageTitle title="Создание персонажа" />
        <CreateCharcaterForm />
    </>   
}