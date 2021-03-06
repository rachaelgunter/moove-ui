import React, { FC, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Grid } from '@material-ui/core';

import { UserContext } from 'src/auth/UserProvider';
import { DATASET_COLUMN_ANALYSIS_VISUALIZATIONS_QUERY } from '../queries';
import { ColumnModel } from '../types';
import ColumnPropertiesList from './ColumnPropertiesList';
import ColumnViewContent, {
  useColumnViewContentStyles,
} from './ColumnViewContent';
import ColumnViewContainer from './ColumnViewContainer';

interface ColumnViewAnalyticsProps {
  column: ColumnModel;
  analysisName: string;
}

const ColumnViewAnalytics: FC<ColumnViewAnalyticsProps> = ({
  column,
  analysisName,
}: ColumnViewAnalyticsProps) => {
  const classes = useColumnViewContentStyles();
  const user = useContext(UserContext);

  const { data } = useQuery(DATASET_COLUMN_ANALYSIS_VISUALIZATIONS_QUERY, {
    variables: {
      bucketName: user.GCSBucketName,
      organizationName: user.organization,
      analysisName,
      columnName: column.name,
    },
  });

  const sections = [
    {
      title: 'Analytical Metrics',
      chartsUrls: data?.datasetColumnVisualizations.analyticsVisualizations,
    },
  ];

  return (
    <ColumnViewContainer>
      <Grid className={classes.gridItem} item xs={3}>
        <Box className={classes.sectionContainer}>
          <Box>Properties</Box>
          <ColumnPropertiesList column={column} />
        </Box>
      </Grid>
      <ColumnViewContent sections={sections} />
    </ColumnViewContainer>
  );
};

export default ColumnViewAnalytics;
