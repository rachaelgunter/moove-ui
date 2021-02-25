import React, { ReactElement } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { makeStyles, Theme, fade } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    height: 52,
    fontSize: 14,
    letterSpacing: 1.25,
    fontFamily: 'Roboto',
    fontWeight: 500,
    marginBottom: theme.spacing(2.75),

    '&:hover': {
      backgroundColor: fade(theme.palette.secondary.dark, 0.8),
    },
    '&:active': {
      backgroundColor: fade(theme.palette.secondary.dark, 0.6),
    },
    '&:disabled': {
      backgroundColor: fade(theme.palette.secondary.dark, 0.4),
      color: fade(theme.palette.text.primary, 0.4),
    },
  },
}));

const SubmitButton = ({ children, ...props }: ButtonProps): ReactElement => {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      color="primary"
      variant="contained"
      fullWidth
      {...props}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
