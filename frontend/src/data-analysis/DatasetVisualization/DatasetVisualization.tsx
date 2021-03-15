import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import { DatasetModel } from 'src/data-analysis/types';
import { CURRENT_USER_QUERY } from 'src/shared/queries';

const VISUALIZATION_BLOCK_HEIGHT = 320;
const DATASET_BUCKET = process.env.REACT_APP_DATASET_ASSETS_BUCKET;
const GCS_URL = `
  https://storage.cloud.google.com/${DATASET_BUCKET}/{dataset}/visual_artifacts/dataset/{filePath}?authuser={userEmail}
`;
const assetPaths = {
  correlationMatrix: 'correlation_matrix/Correlation_Matrix.jpeg',
  heatmap: 'heatmap/heatmap.html',
  time: 'time_charts/time_chart.jpeg',
};

const useStyles = makeStyles({
  iframe: {
    border: 'none',
    height: VISUALIZATION_BLOCK_HEIGHT,
    width: '100%',
  },
  chart: {
    width: '100%',
  },
});

interface DatasetVisualizationProps {
  datasetModel: DatasetModel;
}

const DatasetVisualization: React.FC<DatasetVisualizationProps> = ({
  datasetModel,
}: DatasetVisualizationProps) => {
  const classes = useStyles();

  const { data } = useQuery(CURRENT_USER_QUERY);
  const user = data?.getCurrentUser;

  const generateAssetLink = (filePath: string) =>
    GCS_URL.replace('{dataset}', datasetModel.name)
      .replace('{filePath}', filePath)
      .replace('{userEmail}', user.email);

  return (
    <>
      <Grid item container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="subtitle1">Heatmap</Typography>
        </Grid>
        <Grid item>
          <iframe
            className={classes.iframe}
            title="Heatmap"
            src={generateAssetLink(assetPaths.heatmap)}
            frameBorder="0"
          />
        </Grid>
      </Grid>
      <Grid item container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="subtitle1">Other Metrics</Typography>
        </Grid>
        <Grid item container spacing={2} wrap="nowrap">
          <Grid item>
            <img
              height={VISUALIZATION_BLOCK_HEIGHT}
              className={classes.chart}
              src={generateAssetLink(assetPaths.correlationMatrix)}
              alt=""
            />
          </Grid>
          <Grid item>
            <img
              height={VISUALIZATION_BLOCK_HEIGHT}
              className={classes.chart}
              src={generateAssetLink(assetPaths.time)}
              alt=""
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DatasetVisualization;
