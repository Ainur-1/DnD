import CharacterSkillTraitsMasteryAutoComplete from "@/entities/character/ui/CharacterSkillTraitsMasteryAutoComplete";
import { useClassInfoQuery } from "@/features/classes";
import { useEffect } from "react";

interface SkillTraitMasteryFieldProps {
    classId: string | undefined;
    selectedTraits: string[];
    setSelectedTraits: (values: string[]) => void;
}

export default function  SkillTraitMasteryField({classId, selectedTraits, setSelectedTraits}: SkillTraitMasteryFieldProps) {
    const { data, isFetching, isSuccess } = useClassInfoQuery(classId ?? "", {
        skip: classId == undefined
    });

    useEffect(() => {
        if (isSuccess && data.data?.skillMasteryToChooseCount == 1) {
            setSelectedTraits(data.data.skillTraitsMastery);
        }
    }, [data, isSuccess]);

    return <CharacterSkillTraitsMasteryAutoComplete
        isLoading={isFetching}
        availableSkillTraits={data?.data?.skillTraitsMastery ?? []}
        onChange={setSelectedTraits}
        selectedTraits={selectedTraits}
        skillTraitsToChoose={data?.data?.skillMasteryToChooseCount ?? 1}
     />
}