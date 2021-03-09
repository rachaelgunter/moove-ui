import { Button, makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';
import { FontFamily } from 'src/app/styles/fonts';
import DialogWrapper from 'src/shared/DialogWrapper/DialogWrapper';

interface DetailedColumnViewProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
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
}));

const DetailedColumnView: FC<DetailedColumnViewProps> = ({
  open,
  onClose,
}: DetailedColumnViewProps) => {
  const classes = useStyles();

  const Controls = () => (
    <Button onClick={onClose} className={classes.dialogButton}>
      Close
    </Button>
  );
  const Content = () => <div>kek</div>;

  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      dialogTitle="Column Details"
      dialogControls={<Controls />}
      dialogContent={<Content />}
    />
  );
};

export default DetailedColumnView;
