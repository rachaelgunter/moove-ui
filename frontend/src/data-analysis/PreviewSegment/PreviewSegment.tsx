import React, { FC } from 'react';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { FontFamily } from 'src/app/styles/fonts';
import DialogWrapper from 'src/shared/DialogWrapper/DialogWrapper';
import PreviewSegmentContent from './PreviewSegmentContent';

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
  const Controls = () => (
    <Button onClick={onClose} className={classes.dialogButton}>
      Close
    </Button>
  );

  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      dialogTitle="Segment Preview"
      dialogControls={<Controls />}
      dialogContent={<PreviewSegmentContent segmentId={segment} />}
    />
  );
};

export default PreviewSegment;
