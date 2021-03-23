import React, { FC, useContext } from 'react';
import { Box, CircularProgress, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { UserContext } from 'src/auth/UserProvider';
import ColumnViewCharts from './ColumnViewCharts';

interface ColumnViewContentProps {
  sections: {
    title: string;
    chartsUrls?: [];
  }[];
}

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
    overflow: 'hidden',
  },
  analyticalMetricsTitle: {
    marginBottom: '10px',
  },
  analyticalMetricsContent: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
  },
  spinner: {
    alignSelf: 'center',
    margin: '0 auto',
  },
}));

const ColumnViewContent: FC<ColumnViewContentProps> = ({
  sections,
}: ColumnViewContentProps) => {
  const classes = useStyles();
  const user = useContext(UserContext);

  return (
    <Grid className={classes.gridContainer} container>
      <Grid className={classes.gridItem} item xs>
        <Box className={classes.contentContainer}>
          {sections.map(({ title, chartsUrls }) => (
            <>
              <Box className={classes.analyticalMetricsTitle}>title</Box>
              <Box className={classes.analyticalMetricsContent}>
                {chartsUrls ? (
                  <ColumnViewCharts chartsUrls={chartsUrls} user={user} />
                ) : (
                  <CircularProgress className={classes.spinner} />
                )}
              </Box>
            </>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ColumnViewContent;
