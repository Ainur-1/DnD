import SwitchWithLabelAtStart from "@/shared/ui/SwitchWithLabelAtStart"

interface CoinsAffectWeightSwitchProps {
    value: boolean,
    onChange: (value: boolean) => void,
}

const CoinsAffectWeightSwitch = ({ value, onChange }: CoinsAffectWeightSwitchProps) => <SwitchWithLabelAtStart 
    value={value}
    onChange={onChange}
    label="Учитывать вес монет" />

export default CoinsAffectWeightSwitch;