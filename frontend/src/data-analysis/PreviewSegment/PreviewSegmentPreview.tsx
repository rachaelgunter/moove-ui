import { Box, Grid, Link, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import AutoSizer from 'react-virtualized-auto-sizer';
import { BIG_QUERY_PREVIEW_SEGMENT_QUERY } from '../queries';
import { PreviewSegmentModel } from '../types';
import PreviewSegmentChart from './PreviewSegmentChart';
import PreviewSegmentGridItem from './PreviewSegmentGridItem';
import GoogleStreetView from './GoogleStreetView';

interface PreviewSegmentPreviewProps {
  segmentId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '& > div': {
      height: '50%',
    },
  },
}));

const PreviewSegmentPreview: FC<PreviewSegmentPreviewProps> = ({
  segmentId,
}: PreviewSegmentPreviewProps) => {
  const classes = useStyles();
  const { loading, data, error } = useQuery<{
    previewSegment: PreviewSegmentModel;
  }>(BIG_QUERY_PREVIEW_SEGMENT_QUERY, {
    variables: {
      segmentId,
    },
  });

  if (!loading && error) {
    return (
      <Grid className={classes.container} container spacing={1}>
        <Grid item container xs={12}>
          <Box>
            Unable to load data, please try later. if the problem persists,
            contact support:{' '}
            <Link href="mailto:systems@moove.ai" color="inherit">
              systems@moove.ai
            </Link>
          </Box>
        </Grid>
      </Grid>
    );
  }

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

    const result: [string | number, string | number][] = [['KM', 'Elev']];
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

  const chartData = getChartData(data);

  const { latitude: streetViewLatitiude, longitude: streetViewLongitude } = data
    ?.previewSegment.streetViewCoordinates ?? { latitude: 0, longitude: 0 };

  return (
    <Grid className={classes.container} container spacing={1}>
      <Grid item container xs={12}>
        <PreviewSegmentGridItem title="Elevation Profile" loading={loading}>
          <PreviewSegmentChart data={chartData} segmentId={segmentId} />
        </PreviewSegmentGridItem>
      </Grid>
      <Grid item container xs={7}>
        <PreviewSegmentGridItem title="Terrain Preview" loading={loading}>
          <div />
        </PreviewSegmentGridItem>
      </Grid>
      <Grid item container xs={5}>
        <PreviewSegmentGridItem title="Street View" loading={loading}>
          <AutoSizer>
            {({ height, width }) => (
              <GoogleStreetView
                height={height}
                width={width}
                position={{
                  lat: streetViewLatitiude,
                  lng: streetViewLongitude,
                }}
              />
            )}
          </AutoSizer>
        </PreviewSegmentGridItem>
      </Grid>
    </Grid>
  );
};

export default PreviewSegmentPreview;
