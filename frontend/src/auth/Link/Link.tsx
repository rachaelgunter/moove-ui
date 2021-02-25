import React, { ReactElement } from 'react';
import { Link as MuiLink, LinkProps, Theme } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';

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

const Link = ({ children, ...props }: LinkProps): ReactElement => {
  const classes = useStyles();

  return (
    <MuiLink className={classes.root} underline="always" {...props}>
      {children}
    </MuiLink>
  );
};

export default Link;
