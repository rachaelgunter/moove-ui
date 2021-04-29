import { LinearProgress, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import PageTemplate from '../PageTemplate';

const useStyles = makeStyles({
  loader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
});

const RouterLoadingFallback: FC = () => {
  const classes = useStyles();

  return (
    <PageTemplate title="">
      <LinearProgress className={classes.loader} />
    </PageTemplate>
  );
};

export default RouterLoadingFallback;
