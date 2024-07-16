import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectorProps } from "@/shared/types/IGenericSelectorProps";
import { ArmorType, WeaponAttackType, WeaponDamageType, WeaponProficiencyType } from "@/shared/api/gql/graphql";

interface ArmorTypeSelectorProps extends SelectorProps<ArmorType> {
}

export function ArmorTypeSelector({value, onValueChange, required}: ArmorTypeSelectorProps) {
    const handleChange = (value: ArmorType | string) => {
        if (typeof value === 'string') {
            onValueChange(value as ArmorType);
        } else {
            onValueChange(value);
        }
    };

    return <FormControl fullWidth required={required}>
        <InputLabel id="armorType-select-label">Тип брони</InputLabel>
        <Select 
            required={required}
            labelId="armorType-select-label" 
            id="armorType-select"
            value={value}
            label="Тип брони"
            onChange={(e) => handleChange(e.target.value)}
        >
            <MenuItem value={ArmorType.Light}>Легкий</MenuItem>
            <MenuItem value={ArmorType.Medium}>Средний</MenuItem>
            <MenuItem value={ArmorType.Heavy}>Тяжелый</MenuItem>
            <MenuItem value={ArmorType.Shield}>Щит</MenuItem>
        </Select>
  </FormControl>
}

export function WeaponProficiencyTypeSelector({required, value, onValueChange}: SelectorProps<WeaponProficiencyType>) {
    const handleChange = (value: WeaponProficiencyType | string) => {
        onValueChange(typeof value === 'string' ? value as WeaponProficiencyType : value);
    };

    return <FormControl required={required} fullWidth>
        <InputLabel required={required} id="weaponProficiencyType-select-label">Оружейное мастерство</InputLabel>
        <Select 
            labelId="weaponProficiencyType-select-label" 
            id="weaponProficiencyType-select"
            value={value}
            required={required}
            label="Оружейное мастерство"
            onChange={(e) => handleChange(e.target.value)}
        >
            <MenuItem value={WeaponProficiencyType.Simple}>Обычное</MenuItem>
            <MenuItem value={WeaponProficiencyType.Martial}>Воинское</MenuItem>
        </Select>
  </FormControl>
}

export function WeaponAttackTypeSelector({required, value, onValueChange}: SelectorProps<WeaponAttackType>) {
    const handleChange = (value: WeaponAttackType | string) => {
        onValueChange(typeof value === 'string' ? value as WeaponAttackType : value);
    };

    return <FormControl required={required} fullWidth>
        <InputLabel id="weaponAttackType-select-label">Тип атаки</InputLabel>
        <Select 
            required={required}
            labelId="weaponAttackType-select-label" 
            id="weaponAttackType-select"
            value={value}
            label="Тип атаки"
            onChange={(e) => handleChange(e.target.value)}
        >
            <MenuItem value={WeaponAttackType.Bludgeoning}>Дробящее</MenuItem>
            <MenuItem value={WeaponAttackType.Piercing}>Колющее</MenuItem>
            <MenuItem value={WeaponAttackType.Slashing}>Режущее</MenuItem>
        </Select>
  </FormControl>
}

export function WeaponDamageTypeSelector({required, value, onValueChange}: SelectorProps<WeaponDamageType>) {
    const handleChange = (value: WeaponDamageType | string) => {
        onValueChange(typeof value === 'string' ? value as WeaponDamageType : value);
    };

    return <FormControl required={required} fullWidth>
        <InputLabel id="weaponDamageType-select-label">Радиус действия</InputLabel>
        <Select 
            required={required}
            labelId="weaponDamageType-select-label" 
            id="weaponDamageType-select"
            value={value}
            label="Радиус действия"
            onChange={(e) => handleChange(e.target.value)}
        >
            <MenuItem value={WeaponDamageType.Melee}>Ближний бой</MenuItem>
            <MenuItem value={WeaponDamageType.Ranged}>Дальний бой</MenuItem>
        </Select>
  </FormControl>
}
