import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { WeaponProperty } from '../model/types';
import { Chip, useTheme } from '@mui/material';

const WeaponPropertiesLabelMap = {
    [WeaponProperty.ammunition]: "Боеприпас",
    [WeaponProperty.finesse]: "Фехтовальное",
    [WeaponProperty.loading]: "Перезарядка",
    [WeaponProperty.range]: "Дальнобойное",
    [WeaponProperty.reach]: "Досягаемость",
    [WeaponProperty.special]: "Особое",
    [WeaponProperty.thrown]: "Метательное",
    [WeaponProperty.light]: "Лёгкое",
    [WeaponProperty.heavy]: "Тяжёлое",
    [WeaponProperty.versatile]: "Универсальное",
    [WeaponProperty.twoHanded]: "Двуручное",
};


interface WeaponPropertiesAutocompleteProps {
    selectedProperties: WeaponProperty[],
    setSelectedProperties: (properties: WeaponProperty[]) => void;
    disabled?: boolean
}

export default function WeaponPropertiesAutocomplete({selectedProperties, setSelectedProperties, disabled}: WeaponPropertiesAutocompleteProps) {
    const values = Object.values(WeaponProperty);
    const theme = useTheme();

    const handlePropertyChange = (_: React.ChangeEvent<{}>, values: WeaponProperty[]) => {
        const uniqueValues = values
        .filter((value, index, self) => (
            self.indexOf(value) === index
        ));
        setSelectedProperties(uniqueValues);
    };

    const filteredOptions = values.filter(property =>
        !selectedProperties.includes(property)
    );


    return (
        <Autocomplete
            disabled={disabled}
            multiple
            id="weapon-properties"
            options={filteredOptions}
            getOptionLabel={(option) => WeaponPropertiesLabelMap[option]}
            value={selectedProperties}
            onChange={handlePropertyChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Свойства оружия"
                />
            )}
            renderTags={(value, getTagProps) => value.map((option, index) => (
                <Chip variant="filled" label={WeaponPropertiesLabelMap[option]} {...getTagProps({ index })} sx={{
                  background: theme.palette.secondary.main
                }}
                    title={WeaponPropertiesLabelMap[option]}
                 />
            ))}
        />
    );
};
