import { useQuery } from '@apollo/client';
import { Box, CircularProgress, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC, useContext } from 'react';
import { UserContext } from 'src/auth/UserProvider';
import { DATASET_COLUMN_VISUALIZATIONS_QUERY } from '../queries';
import { ColumnModel } from '../types';
import ColumnPropertiesList from './ColumnPropertiesList';
import ColumnViewCharts from './ColumnViewCharts';

interface ColumnViewAnalyticsProps {
  column: ColumnModel;
  analysisName: string;
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

const ColumnViewAnalytics: FC<ColumnViewAnalyticsProps> = ({
  column,
  analysisName,
}: ColumnViewAnalyticsProps) => {
  const classes = useStyles();
  const user = useContext(UserContext);

  const { data } = useQuery(DATASET_COLUMN_VISUALIZATIONS_QUERY, {
    variables: {
      bucketName: user.GCSBucketName,
      organizationName: user.organization,
      analysisName,
      columnName: column.name,
    },
  });

  return (
    <Grid className={classes.gridContainer} container>
      <Grid className={classes.gridItem} item xs={3}>
        <Box className={classes.contentContainer}>
          <Box>Properties</Box>
          <ColumnPropertiesList column={column} />
        </Box>
      </Grid>
      <Grid className={classes.gridItem} item xs={9}>
        <Box className={classes.contentContainer}>
          <Box className={classes.analyticalMetricsTitle}>
            Analytical Metrics
          </Box>
          <Box className={classes.analyticalMetricsContent}>
            {data ? (
              <ColumnViewCharts
                chartsUrls={data.datasetColumnVisualizations}
                user={user}
              />
            ) : (
              <CircularProgress className={classes.spinner} />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ColumnViewAnalytics;
