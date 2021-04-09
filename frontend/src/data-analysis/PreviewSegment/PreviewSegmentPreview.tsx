import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { PreviewSegmentModel, SegmentData } from '../types';
import PreviewSegmentChart from './PreviewSegmentChart';
import PreviewSegmentGridItem from './PreviewSegmentGridItem';
import GoogleStreetView from './GoogleStreetView';
import PreviewSegmentCesium from './PreviewSegmentCesium';

type PreviewSegmentPreviewProps = SegmentData;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  col1: {
    width: '60%',
  },
  col2: {
    width: '40%',
    '&> div': {
      flexGrow: 1,
    },
  },
  errorContainer: {
    background: theme.palette.bg.dark,
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const PreviewSegmentPreview: FC<PreviewSegmentPreviewProps> = ({
  data,
  loading,
}: PreviewSegmentPreviewProps) => {
  const classes = useStyles();
  const getChartData = (
    responseData:
      | {
          previewSegment: PreviewSegmentModel;
        }
      | undefined,
  ): [string | number, string | number][] => {
    const input: [number, number][] = [];

    try {
      const jsonObject = JSON.parse(
        responseData?.previewSegment?.rawData || '{}',
      )[0];
      input.push(
        ...jsonObject?.slope_offset_cln.map(
          (item: { km_in_seg: string; value: string }) => [
            parseFloat(item.km_in_seg),
            parseInt(item.value, 10),
          ],
        ),
      );
    } catch (e) {
      return [];
    }

    const result: [string | number, string | number][] = [['KM', 'Elevation']];
    const arrayLength = input.length;
    let prev = 0;

    for (let i = 1; i < arrayLength; i += 1) {
      let yValue: number = (input[i][0] - input[i - 1][0]) * input[i][1] + prev;
      prev = yValue;
      yValue *= 0.019;
      result.push([input[i][0], yValue]);
    }

    return result;
  };

  const getCesiumData = (
    responseData:
      | {
          previewSegment: PreviewSegmentModel;
        }
      | undefined,
  ) => {
    try {
      const jsonObject = JSON.parse(
        responseData?.previewSegment?.rawData || '{}',
      )[0];
      const geometryGeoJson =
        (jsonObject?.geometry_geojson &&
          JSON.parse(jsonObject.geometry_geojson)) ||
        {};
      const trafficSignOffset = jsonObject?.traffic_sign_offset || [];

      return {
        geometryGeoJson,
        trafficSignOffset,
      };
    } catch (e) {
      return {
        geometryGeoJson: {},
        trafficSignOffset: [],
      };
    }
  };

  const chartData = getChartData(data);
  const cesiumData = getCesiumData(data);
  const { latitude: streetViewLatitude, longitude: streetViewLongitude } = data
    ?.previewSegment.streetViewCoordinates ?? { latitude: 0, longitude: 0 };

  return (
    <Grid className={classes.container} container spacing={1}>
      <Grid item container className={classes.col1}>
        <PreviewSegmentGridItem title="Terrain Preview" loading={loading}>
          <PreviewSegmentCesium data={cesiumData} />
        </PreviewSegmentGridItem>
      </Grid>
      <Grid
        item
        container
        className={classes.col2}
        direction="column"
        spacing={1}
      >
        <Grid item container>
          <PreviewSegmentGridItem
            backgroundColor="#182327"
            title="Elevation Profile"
            loading={loading}
          >
            <AutoSizer>
              {({ height, width }) => (
                <PreviewSegmentChart
                  height={height}
                  width={width}
                  data={chartData}
                />
              )}
            </AutoSizer>
          </PreviewSegmentGridItem>
        </Grid>
        <Grid item container>
          <PreviewSegmentGridItem title="Street View" loading={loading}>
            <AutoSizer>
              {({ height, width }) => (
                <GoogleStreetView
                  height={height}
                  width={width}
                  position={{
                    lat: streetViewLatitude,
                    lng: streetViewLongitude,
                  }}
                />
              )}
            </AutoSizer>
          </PreviewSegmentGridItem>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PreviewSegmentPreview;
