import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { Chart } from 'react-google-charts';
import AutoSizer from 'react-virtualized-auto-sizer';
import theme from 'src/app/styles';
import { FontFamily } from 'src/app/styles/fonts';

interface PreviewSegmentChartProps {
  data: [string | number, string | number][];
}

const useStyles = makeStyles(() => ({
  chart: {
    margin: 0,
    '&> div > div': {
      height: '100%',
    },
  },
}));

const PreviewSegmentChart: FC<PreviewSegmentChartProps> = ({
  data,
}: PreviewSegmentChartProps) => {
  const classes = useStyles();

  const options = {
    curveType: 'function',
    fontName: FontFamily.ROBOTO,
    hAxis: {
      title: 'Distance Along Segment (KM)',
      textStyle: { color: '#ffffff' },
      titleTextStyle: {
        color: '#ffffff',
        fontName: FontFamily.ROBOTO,
        italic: false,
      },
      gridlines: {
        color: theme.palette.bg.light,
      },
    },
    vAxis: {
      title: 'Change in elevation (M)',
      textStyle: { color: '#ffffff' },
      titleTextStyle: {
        color: '#ffffff',
        fontName: FontFamily.ROBOTO,
        italic: false,
      },
      gridlines: {
        color: theme.palette.bg.light,
      },
    },
    legend: {
      position: 'top',
      alignment: 'center',
      textStyle: {
        color: '#fff',
      },
    },
    series: {
      0: {
        pointSize: 10,
        visibleInLegend: true,
        color: theme.palette.positive,
        tooltip: JSON.parse(
          process.env.REACT_APP_ELEVATION_TOOLTIPS_VISIBLE || 'false',
        ),
      },
    },
    trendlines: {
      0: {
        title: 'Elevation Trend',
        visibleInLegend: true,
        color: theme.palette.error.light,
        titleTextStyle: { color: '#ffffff' },
      },
    },
    backgroundColor: '#182327',
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
