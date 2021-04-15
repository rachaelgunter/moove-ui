import {
  fade,
  FormControl,
  InputLabel,
  Select,
  Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';

interface SelectorProps {
  label: string;
  children: React.ReactNode;
  value: string;
  valueChange: (value: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2.5),

    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.secondary.dark,
    },

    '& .MuiSelect-iconOutlined': {
      color: theme.palette.text.secondary,
    },
  },
  input: {
    backgroundColor: theme.palette.bg.lighter,
    color: fade('#fff', 0.5),
    borderColor: theme.palette.bg.dark,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 300,
    letterSpacing: 0.15,

    '&:focus': {
      backgroundColor: theme.palette.bg.lighter,
    },
  },
  label: {
    color: fade('#fff', 0.5),
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 400,
    letterSpacing: 0.15,
  },
}));

const Selector: FC<SelectorProps> = ({
  label,
  value,
  valueChange,
  children,
}: SelectorProps) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    valueChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel className={classes.label} variant="outlined">
        {label}
      </InputLabel>
      <Select
        variant="outlined"
        value={value}
        onChange={handleChange}
        label={label}
        className={classes.root}
        inputProps={{
          classes: { root: classes.input },
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default Selector;
