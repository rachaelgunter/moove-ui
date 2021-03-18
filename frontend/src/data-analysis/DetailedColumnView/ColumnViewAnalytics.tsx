import { Box, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    margin: '14px 0',
  },
  gridItem: {
    height: '100%',
    paddingRight: theme.spacing(1.5),

    '&:last-child': {
      paddingRight: 0,
    },
  },
  contentContainer: {
    background: theme.palette.bg.dark,
    height: '100%',
    borderRadius: theme.spacing(0.5),
    padding: '10px',
  },
}));

const ColumnViewAnalytics: FC = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.gridContainer} container>
      <Grid className={classes.gridItem} item xs={3}>
        <Box className={classes.contentContainer}>Properties</Box>
      </Grid>
      <Grid className={classes.gridItem} item xs={9}>
        <Box className={classes.contentContainer}>Analytical Metrics</Box>
      </Grid>
    </Grid>
  );
};

export default ColumnViewAnalytics;
