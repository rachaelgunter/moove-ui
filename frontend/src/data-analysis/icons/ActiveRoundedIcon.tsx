import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import ActiveIcon from './ActiveIcon';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    backgroundColor: theme.palette.bg[600],
    borderRadius: '100%',
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const ActiveRoundedIcon: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <ActiveIcon />
    </div>
  );
};

export default ActiveRoundedIcon;
