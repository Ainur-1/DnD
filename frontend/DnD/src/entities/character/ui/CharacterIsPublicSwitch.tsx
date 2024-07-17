import SwitchWithLabelAtStart from "@/shared/ui/SwitchWithLabelAtStart"

interface CharacterIsPublicSwitchProps {
    value: boolean,
    onChange: (value: boolean) => void,
}

const CharacterIsPublicSwitch = ({ value, onChange }: CharacterIsPublicSwitchProps) => 
<SwitchWithLabelAtStart 
    value={value}
    onChange={onChange}
    label="Персонаж доступен для всех"  />

export default CharacterIsPublicSwitch;