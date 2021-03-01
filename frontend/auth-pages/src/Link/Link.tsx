import React, { ReactElement } from 'react';
import { LinkProps, Theme } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.secondary.light,
    '&:hover': {
      color: fade(theme.palette.secondary.light, 0.8),
    },
    '&:active': {
      color: fade(theme.palette.secondary.light, 0.6),
    },
  },
}));

const Link = ({ children, href, ...props }: LinkProps): ReactElement => {
  const classes = useStyles();

  return (
    <RouterLink
      to={href ?? ''}
      className={classes.root}
      underline="always"
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
