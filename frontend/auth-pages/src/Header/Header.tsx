import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Image from '../assets/logo/galileo-logo-medium.svg';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#07131d',
    border: '1px solid #1b3e49',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 80,
    opacity: 0.8,
    position: 'relative',
    zIndex: 1,
  },
}));

const Header: FC = () => {
  const classes = useStyles();

  return (
    <Grid classes={classes} container item justify="center" alignItems="center">
      <Image width="139px" height="24px" />
    </Grid>
  );
};

export default Header;
