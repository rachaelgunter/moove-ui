import React, { FC, ReactElement } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  gridContainer: {
    margin: '14px 0',
  },
}));

interface ColumnViewContainerProps {
  children: ReactElement | ReactElement[];
}

const ColumnViewContainer: FC<ColumnViewContainerProps> = ({
  children,
}: ColumnViewContainerProps) => {
  const classes = useStyles();

  return (
    <Grid className={classes.gridContainer} container>
      {children}
    </Grid>
  );
};

export default ColumnViewContainer;
