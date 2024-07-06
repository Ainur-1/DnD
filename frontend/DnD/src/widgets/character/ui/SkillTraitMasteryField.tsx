import CharacterSkillTraitsMasteryAutoComplete from "@/entities/character/ui/CharacterSkillTraitsMasteryAutoComplete";
import { useClassInfoQuery } from "@/features/classes";
import { useEffect } from "react";

interface SkillTraitMasteryFieldProps {
    classId: string | undefined;
    selectedTraits: string[];
    setSelectedTraits: (values: string[]) => void;
    error?: string;
}

export default function  SkillTraitMasteryField({classId, selectedTraits, setSelectedTraits, error,}: SkillTraitMasteryFieldProps) {
    const { data, isFetching, isSuccess } = useClassInfoQuery(classId ?? "", {
        skip: classId == undefined
    });

    useEffect(() => {
        if (isSuccess && data.data?.skillMasteryToChooseCount == 1) {
            setSelectedTraits(data.data.skillTraitsMastery);
        }
    }, [data, isSuccess]);

    return <CharacterSkillTraitsMasteryAutoComplete
        error={error}
        isLoading={isFetching}
        availableSkillTraits={data?.data?.skillTraitsMastery ?? []}
        onChange={setSelectedTraits}
        selectedTraits={selectedTraits}
        skillTraitsToChoose={data?.data?.skillMasteryToChooseCount ?? 1}
     />
}