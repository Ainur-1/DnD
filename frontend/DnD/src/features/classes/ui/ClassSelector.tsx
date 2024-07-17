import { StringSelector } from "@/shared/ui/GenericSelector";
import { useStrictClassesQuery } from "../api/api";
import { ClassIdType } from "@/entities/classes";

interface ClassSelectorProps {
    onClassSelected: (classId: ClassIdType) => void;
    value: string | undefined;
}

export default function ClassSelector({value, onClassSelected}: ClassSelectorProps) {
    const { data: strictClasses } = useStrictClassesQuery();

    const onValueChange = (classId: ClassIdType) => {
        onClassSelected(classId)
    };

    return <StringSelector 
        selectorLabel="Класс" 
        id="class" 
        value={value ?? ''}
        values={!strictClasses ? [] : strictClasses.classes!.map(x => {
            return {
                label: x.name,
                value: x.id
            };
        })}  
        onValueChange={onValueChange}
    />
}