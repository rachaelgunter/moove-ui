import React, { ReactElement } from 'react';
import { LinkProps, Theme } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: '4px',
    color: theme.palette.text.primary,
    display: 'block',
    height: 52,
    fontSize: 14,
    letterSpacing: 1.25,
    fontFamily: 'Roboto',
    fontWeight: 500,
    textAlign: 'center',
    textDecoration: 'none',
    padding: theme.spacing(2.25),
    marginBottom: theme.spacing(1),
    width: '100%',

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

const ButtonLink = ({ children, href, ...props }: LinkProps): ReactElement => {
  const classes = useStyles();

  return (
    <RouterLink
      to={href ?? ''}
      className={classes.root}
      underline="none"
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default ButtonLink;
