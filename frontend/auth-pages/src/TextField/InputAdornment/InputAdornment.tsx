import React, { ReactElement } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
  IconButton,
  InputAdornment as MuiInputAdornment,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  icon: {
    color: '#7d8488', // rgba(38, 50, 56, 0.6)
  },
}));

interface InputAdornmentProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputAdornment = ({
  showPassword,
  setShowPassword,
}: InputAdornmentProps): ReactElement => {
  const classes = useStyles();

  const onClick = () => {
    setShowPassword(!showPassword);
  };

  const Icon = showPassword ? Visibility : VisibilityOff;

  const onMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <MuiInputAdornment position="end">
      <IconButton
        data-testid="toggle-password-visibility"
        aria-label="toggle password visibility"
        onClick={onClick}
        onMouseDown={onMouseDown}
        edge="end"
      >
        <Icon className={classes.icon} />
      </IconButton>
    </MuiInputAdornment>
  );
};

export default InputAdornment;
