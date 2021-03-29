import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { Chart } from 'react-google-charts';
import AutoSizer from 'react-virtualized-auto-sizer';

interface PreviewSegmentChartProps {
  data: [string | number, string | number][];
  segmentId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  chart: {
    margin: 0,
    '&> div > div': {
      height: '100%',
    },
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
      textStyle: { color: '#ffffff' },
      titleTextStyle: { color: '#ffffff' },
      gridlines: {
        // color: '#fff',
        opacity: 0.3,
      },
    },
    vAxis: {
      title: 'Change in elevation (M)',
      textStyle: { color: '#ffffff' },
      titleTextStyle: { color: '#ffffff' },
      gridlines: {
        // color: '#fff',
        opacity: 0.3,
      },
    },
    legend: {
      position: 'bottom',
      textStyle: {
        color: '#fff',
      },
    },
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
        color: '#ff0000',
        titleTextStyle: { color: '#ffffff' },
      },
    },
    backgroundColor: '#000000',
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Chart
          width={width}
          height={height - 10}
          className={classes.chart}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={data}
          options={options}
          rootProps={{ 'data-testid': '1' }}
        />
      )}
    </AutoSizer>
  );
};

export default PreviewSegmentChart;
