import { Box, CircularProgress, Grid, Link, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { BIG_QUERY_PREVIEW_SEGMENT_QUERY } from '../queries';
import { PreviewSegmentModel } from '../types';

interface PreviewSegmentPreviewProps {
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
      overflow: 'auto',
    },
  },
}));

const PreviewSegmentPreview: FC<PreviewSegmentPreviewProps> = ({
  segmentId,
}: PreviewSegmentPreviewProps) => {
  const classes = useStyles();
  const { loading, data, error } = useQuery(BIG_QUERY_PREVIEW_SEGMENT_QUERY, {
    variables: {
      segmentId,
    },
  });

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

  const formatData = (responseData: {
    previewSegment: PreviewSegmentModel;
  }): string => {
    return responseData?.previewSegment?.rawData ? 'test' : '';
  };

  return (
    <Grid className={classes.gridContainer} container spacing={1}>
      <Grid item container xs={12}>
        <Box>{loading ? <CircularProgress /> : formatData(data)}</Box>
      </Grid>
      <Grid item container xs={9}>
        <Box>{loading && <CircularProgress />}</Box>
      </Grid>
      <Grid item container xs={3}>
        <Box>{loading && <CircularProgress />}</Box>
      </Grid>
    </Grid>
  );
};

export default PreviewSegmentPreview;
