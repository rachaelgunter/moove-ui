import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { Chart } from 'react-google-charts';
import theme from 'src/app/styles';
import { FontFamily } from 'src/app/styles/fonts';

interface PreviewSegmentChartProps {
  data: [string | number, string | number][];
  height: number;
  width: number;
}

const useStyles = makeStyles(() => ({
  chart: {
    margin: 0,
    width: '100%',
    height: '100%',
    '&> div > div': {
      height: '100%',
    },
  },
}));

const PreviewSegmentChart: FC<PreviewSegmentChartProps> = ({
  data,
  height,
  width,
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
      textStyle: { color: '#182327', fontSize: 1 },
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
        tooltip: JSON.parse(
          process.env.REACT_APP_ELEVATION_TOOLTIPS_VISIBLE || 'false',
        ),
      },
    },
    backgroundColor: '#182327',
  };

  return (
    <Chart
      width={width}
      height={height}
      className={classes.chart}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={options}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default PreviewSegmentChart;
