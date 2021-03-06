import React, { useState } from 'react';
import { TextField as MuiTextField } from '@material-ui/core';
import { makeStyles, Theme, fade } from '@material-ui/core/styles';

import InputAdornment from './InputAdornment';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2.5),

    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.dark,
      },
    },
  },
  input: {
    backgroundColor: theme.palette.bg.lighter,
    color: fade('#fff', 0.5),
    borderColor: theme.palette.bg.dark,
    minHeight: 56,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 300,
    letterSpacing: 0.15,
  },
  label: {
    color: fade('#fff', 0.5),
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 400,
    letterSpacing: 0.15,
  },
  notchedOutline: {
    border: 'none',
  },
}));

export enum TextFieldType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface TextFieldProps {
  label: string;
  value: string;
  type?: string;
  error?: boolean;
  errorText?: string;
  multiline?: boolean;
  onChange: (newValue: string) => void;
}

const TextField = ({
  label,
  value,
  error = false,
  type = TextFieldType.TEXT,
  errorText = '',
  multiline = false,
  ...props
}: TextFieldProps): JSX.Element => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === TextFieldType.PASSWORD;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    props.onChange(event.target.value);

  return (
    <MuiTextField
      id={`${label}-text-field`}
      error={error}
      helperText={error ? errorText : ''}
      className={classes.root}
      InputProps={{
        classes: {
          root: classes.input,
          notchedOutline: classes.notchedOutline,
        },
        endAdornment: isPassword ? (
          <InputAdornment
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        ) : undefined,
      }}
      InputLabelProps={{
        classes: { outlined: classes.label },
      }}
      label={label}
      type={
        isPassword && !showPassword
          ? TextFieldType.PASSWORD
          : TextFieldType.TEXT
      }
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      multiline={multiline}
    />
  );
};

export default TextField;
