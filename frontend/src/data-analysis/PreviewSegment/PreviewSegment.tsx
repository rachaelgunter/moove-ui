import React, { FC, useState } from 'react';
import { Box, Button, makeStyles, Tabs, Tab, Theme } from '@material-ui/core';
import { FontFamily } from 'src/app/styles/fonts';
import DialogWrapper from 'src/shared/DialogWrapper/DialogWrapper';
import PreviewSegmentTabPanel from './PreviewSegmentTabPanel';
import PreviewSegmentBreadcrumbs from './PreviewSegmentBreadcrumbs';
import PreviewSegmentPreview from './PreviewSegmentPreview';
import PreviewSegmentData from './PreviewSegmentData';

interface PreviewSegmentProps {
  open: boolean;
  onClose: () => void;
  segment: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    background: theme.palette.bg.dark,
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '4px',
  },
  dialogButton: {
    fontFamily: FontFamily.ROBOTO,
    color: theme.palette.text.secondary,
    height: '36px',
    letterSpacing: '1.25px',
    marginLeft: theme.spacing(1),

    '&:disabled': {
      color: '#455a64',
    },
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

const PreviewSegment: FC<PreviewSegmentProps> = ({
  open,
  onClose,
  segment,
}: PreviewSegmentProps) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [isFullScreen, setFullScreen] = useState(false);

  const handleChange = (
    _: React.ChangeEvent<Record<string, string>>,
    newValue: number,
  ) => {
    setValue(newValue);
  };

  const Controls = () => (
    <Button onClick={onClose} className={classes.dialogButton}>
      Close
    </Button>
  );

  const Content = () => (
    <>
      <Box className={classes.header} data-fullscrean={isFullScreen}>
        <PreviewSegmentBreadcrumbs segment={segment} />
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
        <PreviewSegmentPreview segmentId={segment} />
      </PreviewSegmentTabPanel>
      <PreviewSegmentTabPanel value={value} index={1}>
        <PreviewSegmentData segmentId={segment} />
      </PreviewSegmentTabPanel>
    </>
  );

  return (
    <DialogWrapper
      onResize={(isFullScreenValue) => {
        setFullScreen(isFullScreenValue);
      }}
      open={open}
      onClose={onClose}
      dialogTitle="Segment Preview"
      dialogControls={<Controls />}
      dialogContent={<Content />}
    />
  );
};

export default PreviewSegment;
