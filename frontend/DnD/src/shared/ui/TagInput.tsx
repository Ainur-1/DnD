import { useState, KeyboardEvent } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { Autocomplete, useTheme } from '@mui/material';

interface TagInputProps {
    inputPlaceHolder: string,
    setTags: (tags: string[]) => void,
    tags: string[],
    disabled?: boolean
}
export default function TagInput({inputPlaceHolder, setTags, tags, disabled=false}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const theme = useTheme();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  return (
    <Autocomplete
          multiple
          disabled={disabled}
          value={tags}
          onChange={(_, newValue: string[]) => {
              setTags(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue);
          } }
          renderTags={(value, getTagProps) => value.map((option, index) => (
              <Chip variant="filled" label={option} {...getTagProps({ index })} sx={{
                background: theme.palette.secondary.main
              }} />
          ))}
          renderInput={(params) => (
              <TextField
                  {...params}
                  margin='dense'
                  variant="outlined"
                  placeholder={inputPlaceHolder}
                  onKeyDown={handleKeyDown} />
          )}
          noOptionsText=""
          PopperComponent={() => null}
          sx={{
            '& .MuiAutocomplete-endAdornment': {
              display: 'none',
            },
            '& .MuiAutocomplete-popper': {
                display: 'none !important',
              },
            width: '100%'
          }}
          filterOptions={(_) => []}
          options={[]}
        />
  );
};
