import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ArmorType, WeaponAttackType, WeaponDamageType, WeaponProficiencyType } from "../model/types";
import { GenericSelectorProps } from "@/shared/types/IGenericSelectorProps";


interface ArmorTypeSelectorProps extends GenericSelectorProps<ArmorType> {
}

export function ArmorTypeSelector({value, onValueChange, required}: ArmorTypeSelectorProps) {
    const handleChange = (value: ArmorType | string) => {
        if (typeof value === 'string') {
            const enumValue = value.toLowerCase();
            onValueChange(ArmorType[enumValue as keyof typeof ArmorType]);
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
            <MenuItem value={ArmorType.light}>Легкий</MenuItem>
            <MenuItem value={ArmorType.medium}>Средний</MenuItem>
            <MenuItem value={ArmorType.heavy}>Тяжелый</MenuItem>
            <MenuItem value={ArmorType.shield}>Щит</MenuItem>
        </Select>
  </FormControl>
}

export function WeaponProficiencyTypeSelector({required, value, onValueChange}: GenericSelectorProps<WeaponProficiencyType>) {
    const handleChange = (value: WeaponProficiencyType | string) => {
        onValueChange(typeof value === 'string' ? WeaponProficiencyType[(value.toLowerCase() as keyof typeof WeaponProficiencyType)] : value);
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
            <MenuItem value={WeaponProficiencyType.simple}>Обычное</MenuItem>
            <MenuItem value={WeaponProficiencyType.martial}>Воинское</MenuItem>
        </Select>
  </FormControl>
}

export function WeaponAttackTypeSelector({required, value, onValueChange}: GenericSelectorProps<WeaponAttackType>) {
    const handleChange = (value: WeaponAttackType | string) => {
        onValueChange(typeof value === 'string' ? WeaponAttackType[(value.toLowerCase() as keyof typeof WeaponAttackType)] : value);
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
            <MenuItem value={WeaponAttackType.bludgeoning}>Дробящее</MenuItem>
            <MenuItem value={WeaponAttackType.piercing}>Колющее</MenuItem>
            <MenuItem value={WeaponAttackType.slashing}>Режущее</MenuItem>
        </Select>
  </FormControl>
}

export function WeaponDamageTypeSelector({required, value, onValueChange}: GenericSelectorProps<WeaponDamageType>) {
    const handleChange = (value: WeaponDamageType | string) => {
        onValueChange(typeof value === 'string' ? WeaponDamageType[(value.toLowerCase() as keyof typeof WeaponDamageType)] : value);
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
            <MenuItem value={WeaponDamageType.melee}>Ближний бой</MenuItem>
            <MenuItem value={WeaponDamageType.ranged}>Дальний бой</MenuItem>
        </Select>
  </FormControl>
}
