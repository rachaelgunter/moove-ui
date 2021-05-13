import React from 'react';
import {
  Autocomplete as MuiAutocomplete,
  createFilterOptions,
} from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import TextField from '../TextField';

interface AutocompleteProps {
  options: string[];
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const filter = createFilterOptions<string>();

const useStyles = makeStyles((theme: Theme) => ({
  popupIndicator: {
    color: theme.palette.text.secondary,
  },
  listbox: {
    outline: 0,
    padding: theme.spacing(1, 0),
    backgroundColor: theme.palette.bg.light,
    position: 'relative',
    listStyle: 'none',
  },
  option: {
    backgroundColor: theme.palette.bg.light,
  },
}));

const Autocomplete: React.FC<AutocompleteProps> = ({
  options: autocompleteOptions,
  label,
  value,
  onChange,
}: AutocompleteProps) => {
  const classes = useStyles();

  return (
    <MuiAutocomplete
      classes={classes}
      selectOnFocus
      clearOnBlur
      freeSolo
      forcePopupIcon
      disableClearable
      debug
      value={value}
      options={autocompleteOptions}
      onChange={(_event, newValue) => {
        onChange(newValue as string);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
          filtered.push(params.inputValue);
        }

        return filtered;
      }}
      renderInput={(props) => <TextField {...props} label={label} />}
    />
  );
};

export default Autocomplete;
