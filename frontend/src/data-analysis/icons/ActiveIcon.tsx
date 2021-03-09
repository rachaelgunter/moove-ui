import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import { ReactComponent as LayersIcon } from 'src/assets/icons/layers.svg';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.grey[500],
  },
}));

const ActiveIcon: React.FC = () => {
  const classes = useStyles();

  return <LayersIcon fontSize="small" className={classes.root} />;
};

export default ActiveIcon;
