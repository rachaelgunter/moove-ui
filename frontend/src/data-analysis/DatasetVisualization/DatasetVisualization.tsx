import React, { useContext, useEffect, useState } from 'react';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';

import { DatasetModel } from 'src/data-analysis/types';
import { UserContext } from 'src/auth/UserProvider';
import Chart from 'src/data-analysis/DatasetVisualization/Chart';
import Heatmap from 'src/data-analysis/DatasetVisualization/Heatmap';

interface DatasetVisualizationProps {
  datasetModel: DatasetModel;
}

enum ChartType {
  HEATMAP = 'heatmap',
  CORRELATION_MATRIX = 'correlationMatrix',
  TIME = 'time',
}

type ChartsState = {
  [key in ChartType]: {
    isVisible: boolean;
    isLoading: boolean;
  };
};

const VISUALIZATION_BLOCK_HEIGHT = 320;
const DATASET_BUCKET = process.env.REACT_APP_DATASET_ASSETS_BUCKET;
const GCS_URL = `
  https://storage.cloud.google.com/${DATASET_BUCKET}/{dataset}/visual_artifacts/dataset/{filePath}?authuser={userEmail}
`;

const assetPaths = {
  [ChartType.CORRELATION_MATRIX]: 'correlation_matrix/Correlation_Matrix.jpeg',
  [ChartType.HEATMAP]: 'heatmap/heatmap.html',
  [ChartType.TIME]: 'time_charts/time_chart.jpeg',
};

const InitialChartsState: ChartsState = [
  ChartType.HEATMAP,
  ChartType.CORRELATION_MATRIX,
  ChartType.TIME,
].reduce((acc, chart) => {
  acc[chart] = {
    isVisible: true,
    isLoading: true,
  };
  return acc;
}, {} as ChartsState);

const useStyles = makeStyles((theme: Theme) => ({
  chartPlaceholderWrapper: {
    width: '100%',
  },
  chartPlaceholder: {
    background: theme.palette.bg.light,
    height: VISUALIZATION_BLOCK_HEIGHT,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const DatasetVisualization: React.FC<DatasetVisualizationProps> = ({
  datasetModel,
}: DatasetVisualizationProps) => {
  const [chartsState, setChartsState] = useState<ChartsState>(
    InitialChartsState,
  );
  const user = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    setChartsState(InitialChartsState);
  }, [datasetModel]);

  const generateAssetLink = (filePath: string) =>
    GCS_URL.replace('{dataset}', datasetModel.name)
      .replace('{filePath}', filePath)
      .replace('{userEmail}', user.email);

  const onChartLoadingError = (chart: ChartType) => {
    setChartsState({
      ...chartsState,
      [chart]: {
        isLoading: false,
        isVisible: false,
      },
    });
  };

  const onChartLoad = (chart: ChartType) => {
    setChartsState({
      ...chartsState,
      [chart]: {
        ...chartsState[chart],
        isLoading: false,
      },
    });
  };

  const getMetricCharts = () => {
    return [ChartType.CORRELATION_MATRIX, ChartType.TIME].map((chart) =>
      chartsState[chart].isVisible ? (
        <Chart
          key={chart}
          onLoad={() => onChartLoad(chart)}
          onError={() => onChartLoadingError(chart)}
          src={generateAssetLink(assetPaths[chart])}
          height={VISUALIZATION_BLOCK_HEIGHT}
          loading={chartsState[chart].isLoading}
        />
      ) : (
        <Grid className={classes.chartPlaceholderWrapper} item key={chart}>
          <div className={classes.chartPlaceholder}>
            Unable to display chart
          </div>
        </Grid>
      ),
    );
  };

  return (
    <>
      <Grid item container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="subtitle1">Heatmap</Typography>
        </Grid>
        <Heatmap
          onLoad={() => onChartLoad(ChartType.HEATMAP)}
          onError={() => onChartLoadingError(ChartType.HEATMAP)}
          src={generateAssetLink(assetPaths.heatmap)}
          height={VISUALIZATION_BLOCK_HEIGHT * 2}
          loading={chartsState[ChartType.HEATMAP].isLoading}
        />
      </Grid>
      <Grid item container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="subtitle1">Other Metrics</Typography>
        </Grid>
        <Grid item container spacing={2} wrap="nowrap">
          {getMetricCharts()}
        </Grid>
      </Grid>
    </>
  );
};

export default DatasetVisualization;
