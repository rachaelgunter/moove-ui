import React, { FC, useState } from 'react';
import { Box, makeStyles, Tabs, Tab, Theme } from '@material-ui/core';
import PreviewSegmentTabPanel from './PreviewSegmentTabPanel';
import PreviewSegmentBreadcrumbs from './PreviewSegmentBreadcrumbs';
import PreviewSegmentPreview from './PreviewSegmentPreview';
import PreviewSegmentData from './PreviewSegmentData';

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
      <PreviewSegmentTabPanel value={value} index={0}>
        <PreviewSegmentPreview segmentId={currentSegmentId} />
      </PreviewSegmentTabPanel>
      <PreviewSegmentTabPanel value={value} index={1}>
        <PreviewSegmentData segmentId={currentSegmentId} />
      </PreviewSegmentTabPanel>
    </>
  );
};
export default PreviewSegmentContent;
