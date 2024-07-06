import { StringSelector } from "@/shared/ui/GenericSelector";
import { useStrictClassesQuery } from "../api/api";
import { ClassIdType } from "@/entities/classes";

interface ClassSelectorProps {
    onClassSelected: (classId: ClassIdType) => void;
}

export default function ClassSelector({onClassSelected}: ClassSelectorProps) {
    const { data: strictClasses } = useStrictClassesQuery();

    const onValueChange = (classId: ClassIdType) => {
        onClassSelected(classId)
    };

    return <StringSelector 
        selectorLabel="Класс" 
        id="class" 
        values={!strictClasses?.data ? [] : strictClasses!.data!.map(x => {
            return {
                label: x.name,
                value: x.id
            };
        })}  
        onValueChange={onValueChange}
    />
}