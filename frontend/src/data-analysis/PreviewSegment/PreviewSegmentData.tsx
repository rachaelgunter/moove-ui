import {
  Grid,
  Box,
  Theme,
  CircularProgress,
  Link,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { BIG_QUERY_PREVIEW_SEGMENT_QUERY } from '../queries';
import { PreviewSegmentModel } from '../types';
import { PreviewSegmentStatistics } from './PreviewSegmentStatistics';
import { FontFamily } from '../../app/styles/fonts';

interface PreviewSegmentDataProps {
  segmentId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '&> div': {
      flex: '1 0 100%',
      display: 'flex',
    },
    '&> div > div': {
      flex: '1 0 100%',
      backgroundColor: theme.palette.bg.dark,
      width: '100%',
      height: '100%',
      overflow: 'auto',
    },
  },
  title: {
    fontSize: 12,
    fontFamily: FontFamily.ROBOTO,
    letterSpacing: '0.11px',
    margin: theme.spacing(1),
  },
  rawData: {
    padding: '0 7px',
    fontSize: 12,
    fontFamily: FontFamily.ROBOTO,
    letterSpacing: '0.11px',
  },
}));

const PreviewSegmentData: FC<PreviewSegmentDataProps> = ({
  segmentId,
}: PreviewSegmentDataProps) => {
  const classes = useStyles();
  const { loading, data, error } = useQuery(BIG_QUERY_PREVIEW_SEGMENT_QUERY, {
    variables: {
      segmentId,
    },
  });
  const getPreviewData = (responseData: {
    previewSegment: PreviewSegmentModel;
  }): PreviewSegmentModel => {
    return responseData?.previewSegment || {};
  };
  const formatRawData = (rawData: string | undefined): string => {
    if (rawData === undefined) {
      return '';
    }

    try {
      return JSON.stringify(JSON.parse(rawData), null, 2);
    } catch (e) {
      return rawData;
    }
  };

  const { statistics, rawData } = getPreviewData(data);

  if (!loading && error) {
    return (
      <Grid className={classes.gridContainer} container spacing={1}>
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

  return (
    <Grid className={classes.gridContainer} container spacing={1}>
      <Grid item container xs={4}>
        <Grid item>
          <Typography className={classes.title} variant="subtitle1">
            Statistics
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <PreviewSegmentStatistics statistics={statistics} />
          )}
        </Grid>
      </Grid>
      <Grid item container xs={8}>
        <Grid item>
          <Typography className={classes.title} variant="subtitle1">
            Raw Data
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <div className={classes.rawData}>
              <pre>{formatRawData(rawData)}</pre>
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PreviewSegmentData;
