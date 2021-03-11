import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { FC } from 'react';
import { FontFamily } from 'src/app/styles/fonts';
import Typography from 'src/shared/Typography';

interface DialogWrapperProps {
  open: boolean;
  dialogTitle: string;
  dialogContent: JSX.Element;
  dialogControls?: JSX.Element;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    minHeight: '790px',
    minWidth: '1040px',
    fontFamily: FontFamily.ROBOTO,
  },
  contentRoot: {
    padding: theme.spacing(0.5, 3, 0, 3),
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    backgroundColor: theme.palette.divider,
  },
  dialogTitleRoot: {
    padding: theme.spacing(3),
  },
  dialogTitle: {
    fontWeight: 400,
    fontSize: 20,
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
  dialogControls: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: theme.spacing(6),
  },
}));

const DialogWrapper: FC<DialogWrapperProps> = ({
  open,
  onClose,
  dialogTitle,
  dialogContent,
  dialogControls,
}: DialogWrapperProps) => {
  const classes = useStyles();

  return (
    <Dialog classes={{ paper: classes.paper }} open={open} onClose={onClose}>
      <DialogTitle className={classes.dialogTitleRoot}>
        <Typography
          color="textPrimary"
          fontFamily={FontFamily.ROBOTO}
          className={classes.dialogTitle}
        >
          {dialogTitle}
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.contentRoot}>
        {dialogContent}
        <Divider />
        <Box className={classes.dialogControls}>{dialogControls}</Box>
      </DialogContent>
    </Dialog>
  );
};

DialogWrapper.defaultProps = {
  dialogControls: <></>,
};

export default DialogWrapper;
