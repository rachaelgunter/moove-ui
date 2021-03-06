import { Grid, Box, Theme, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import ReactJson from 'react-json-view';
import { SegmentData } from '../types';
import { PreviewSegmentStatistics } from './PreviewSegmentStatistics';
import { FontFamily } from '../../app/styles/fonts';
import PreviewSegmentGridItem from './PreviewSegmentGridItem';

type PreviewSegmentDataProps = SegmentData;

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    '&> div': {
      flex: '1 0 100%',
      display: 'flex',
    },
    '&> div > div1': {
      flex: '1 0 100%',
      backgroundColor: theme.palette.bg.dark,
      width: '100%',
      height: '100%',
    },
  },
  title: {
    fontSize: 12,
    fontFamily: FontFamily.ROBOTO,
    letterSpacing: '0.11px',
    margin: theme.spacing(1),
    flex: '0 0 auto',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.bg.dark,
    width: '100%',
  },
  scrollContentWrapper: {
    position: 'relative',
    flex: '1 0 auto',
    width: '100%',
  },
  rawData: {
    overflow: 'auto',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    height: '100%',
    weight: '100%',
    padding: '0 7px',
    fontSize: 12,
    fontFamily: FontFamily.ROBOTO,
    letterSpacing: '0.11px',
  },
  errorContainer: {
    background: theme.palette.bg.dark,
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const PreviewSegmentData: FC<PreviewSegmentDataProps> = ({
  data,
  error,
  loading,
}: PreviewSegmentDataProps) => {
  const classes = useStyles();
  const hasSegmentNotFoundError =
    error?.graphQLErrors?.some(
      (responseError) =>
        responseError?.extensions?.code === 'SEGMENT_NOT_FOUND',
    ) || false;

  const formatRawData = (
    rawData: string | undefined,
  ): { [key: string]: string } => {
    if (rawData === undefined) {
      return {};
    }

    try {
      return JSON.parse(rawData)[0];
    } catch (e) {
      return {};
    }
  };

  const { statistics, rawData } = data?.previewSegment || {};

  if (!loading && error) {
    if (hasSegmentNotFoundError) {
      return (
        <Grid className={classes.gridContainer} container spacing={1}>
          <Grid item container xs={12}>
            <Box className={classes.errorContainer}>Segment not found</Box>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid className={classes.gridContainer} container spacing={1}>
        <Grid item container xs={12}>
          <Box className={classes.errorContainer}>
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
        <PreviewSegmentGridItem title="Statistics" loading={loading}>
          <PreviewSegmentStatistics statistics={statistics} />
        </PreviewSegmentGridItem>
      </Grid>
      <Grid item container xs={8}>
        <PreviewSegmentGridItem title="Raw Data" loading={loading}>
          <ReactJson
            name={null}
            style={{ background: 'none' }}
            theme="ashes"
            displayDataTypes={false}
            enableClipboard={false}
            iconStyle="circle"
            collapsed={1}
            src={formatRawData(rawData)}
          />
        </PreviewSegmentGridItem>
      </Grid>
    </Grid>
  );
};

export default PreviewSegmentData;
