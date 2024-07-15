import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Chip, useTheme } from '@mui/material';
import { WeaponProperty } from '@/shared/api/gql/graphql';
import { labelMap } from '@/shared/maps/WeaponPropertiesLabelMap';

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
            getOptionLabel={(option) => labelMap[option]}
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
                <Chip variant="filled" label={labelMap[option]} {...getTagProps({ index })} sx={{
                  background: theme.palette.secondary.main
                }}
                    title={labelMap[option]}
                 />
            ))}
        />
    );
};
