import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { Chart } from 'react-google-charts';

interface PreviewSegmentChartProps {
  data: [string | number, string | number][];
  segmentId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  chart: {
    margin: 0,
  },
}));

const PreviewSegmentChart: FC<PreviewSegmentChartProps> = ({
  data,
  segmentId,
}: PreviewSegmentChartProps) => {
  const classes = useStyles();

  const options = {
    title: `Elevation Profile, segment ${segmentId}`,
    curveType: 'function',
    hAxis: {
      title: 'Distance Along Segment (KM)',
    },
    vAxis: {
      title: 'Change in elevation (M)',
    },
    legend: { position: 'bottom' },
    series: {
      0: {
        pointSize: 10,
        visibleInLegend: true,
      },
    },
    trendlines: {
      0: {
        showR2: true,
        title: 'Elev Trend',
        visibleInLegend: true,
        opacity: 0.2,
      },
    },
  };

  return (
    <Box className={classes.chart}>
      <Chart
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={options}
        rootProps={{ 'data-testid': '1' }}
      />
    </Box>
  );
};

export default PreviewSegmentChart;
