import React, { FC, useState } from 'react';
import {
  Box,
  makeStyles,
  Tabs,
  Tab,
  Theme,
  Grid,
  Link,
} from '@material-ui/core';
import PreviewSegmentTabPanel from './PreviewSegmentTabPanel';
import PreviewSegmentBreadcrumbs from './PreviewSegmentBreadcrumbs';
import PreviewSegmentPreview from './PreviewSegmentPreview';
import PreviewSegmentData from './PreviewSegmentData';
import PreviewSegmentDataLoader from './PreviewSegmentDataLoader';

interface PreviewSegmentContentProps {
  segmentId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    background: theme.palette.bg.dark,
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '4px',
  },
  tab: {
    textTransform: 'none',
    fontSize: 13,
    minHeight: '39px',
    minWidth: '50px',
    padding: '10px 20px 9px 21px',
  },
  tabs: {
    minHeight: '39px',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    flexGrow: 1,
  },
  errorContainer: {
    background: theme.palette.bg.dark,
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

const PreviewSegmentContent: FC<PreviewSegmentContentProps> = ({
  segmentId,
}: PreviewSegmentContentProps) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [currentSegmentId, setCurrentSegmentId] = useState(segmentId);
  const updateSegmentId = (newSegmentId: string) => {
    setCurrentSegmentId(newSegmentId);
  };

  const handleChange = (
    _: React.ChangeEvent<Record<string, string>>,
    newValue: number,
  ) => {
    setValue(newValue);
  };

  return (
    <>
      <Box className={classes.header}>
        <PreviewSegmentBreadcrumbs
          segment={currentSegmentId}
          onLoadSegment={updateSegmentId}
        />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="segment preview tabs"
          className={classes.tabs}
        >
          <Tab className={classes.tab} label="Preview" />
          <Tab className={classes.tab} label="Data" />
        </Tabs>
      </Box>
      <PreviewSegmentDataLoader
        segmentId={currentSegmentId}
        selectedTab={value}
      >
        {(selectedTab, data, error, loading) => {
          const hasSegmentNotFoundError =
            error?.graphQLErrors?.some(
              (responseError) =>
                responseError?.extensions?.code === 'SEGMENT_NOT_FOUND',
            ) || false;

          if (!loading && error) {
            if (hasSegmentNotFoundError) {
              return (
                <Grid className={classes.container} container spacing={1}>
                  <Grid item container xs={12}>
                    <Box className={classes.errorContainer}>
                      Segment not found
                    </Box>
                  </Grid>
                </Grid>
              );
            }

            return (
              <Grid className={classes.container} container spacing={1}>
                <Grid item container xs={12}>
                  <Box className={classes.errorContainer}>
                    Unable to load data, please try later. If the problem
                    persists, contact support:{' '}
                    <Link href="mailto:systems@moove.ai" color="inherit">
                      systems@moove.ai
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            );
          }

          return (
            <>
              <PreviewSegmentTabPanel key="tab1" value={selectedTab} index={0}>
                <PreviewSegmentPreview {...{ data, error, loading }} />
              </PreviewSegmentTabPanel>
              <PreviewSegmentTabPanel key="tab2" value={selectedTab} index={1}>
                <PreviewSegmentData {...{ data, error, loading }} />
              </PreviewSegmentTabPanel>
            </>
          );
        }}
      </PreviewSegmentDataLoader>
    </>
  );
};
export default PreviewSegmentContent;
