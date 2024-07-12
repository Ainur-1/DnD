import CharacterSkillTraitsMasteryAutoComplete from "@/entities/character/ui/CharacterSkillTraitsMasteryAutoComplete";
import { useClassInfoQuery } from "@/features/classes";
import { ClassType } from "@/shared/api/gql/graphql";
import { useEffect } from "react";

interface SkillTraitMasteryFieldProps {
    classId: string | undefined;
    selectedTraits: string[];
    setSelectedTraits: (values: string[]) => void;
    error?: string;
}

export default function  SkillTraitMasteryField({classId, selectedTraits, setSelectedTraits, error,}: SkillTraitMasteryFieldProps) {
    const { data, isFetching, isSuccess } = useClassInfoQuery({id: classId as ClassType}, {
        skip: classId == undefined
    });

    useEffect(() => {
        if (isSuccess && data.classInfo.skillMasteryToChooseCount == 1) {
            setSelectedTraits(data.classInfo.skillTraitsMastery);
        } 
    }, [data, isSuccess]);

    return <CharacterSkillTraitsMasteryAutoComplete
        error={error}
        isLoading={isFetching}
        availableSkillTraits={data?.classInfo?.skillTraitsMastery ?? []}
        onChange={setSelectedTraits}
        selectedTraits={selectedTraits}
        skillTraitsToChoose={data?.classInfo?.skillMasteryToChooseCount ?? 0}
     />
}