import React, { useState } from 'react';
import {
  TextField as MuiTextField,
  StandardTextFieldProps as MuiTextFieldProps,
} from '@material-ui/core';
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
    height: 56,
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
}));

export enum TextFieldType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'onChange'> {
  label: string;
  value?: string;
  type?: string;
  error?: boolean;
  errorText?: string;
  onChange?: (newValue: string) => void;
}

const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      label,
      value,
      error = false,
      errorText,
      type = TextFieldType.TEXT,
      onChange,
      InputProps,
      InputLabelProps,
      ...textFieldProps
    }: TextFieldProps,
    ref,
  ): JSX.Element => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === TextFieldType.PASSWORD;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange && onChange(event.target.value);

    return (
      <MuiTextField
        id={`${label}-text-field`}
        error={error}
        helperText={error && errorText ? errorText : ''}
        className={classes.root}
        InputProps={{
          ...InputProps,
          classes: { root: classes.input },
          endAdornment: isPassword ? (
            <InputAdornment
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          ) : (
            InputProps && InputProps.endAdornment
          ),
        }}
        InputLabelProps={{
          ...InputLabelProps,
          classes: { outlined: classes.label },
        }}
        label={label}
        type={
          isPassword && !showPassword
            ? TextFieldType.PASSWORD
            : TextFieldType.TEXT
        }
        value={value}
        onChange={handleChange}
        inputRef={ref}
        variant="outlined"
        fullWidth
        {...textFieldProps}
      />
    );
  },
);

export default TextField;
