import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { FontFamily } from 'src/app/styles/fonts';
import MaximizeIcon from 'src/data-analysis/icons/MaximizeIcon';
import Typography from 'src/shared/Typography';
import IconButton from '../IconButton';

interface DialogWrapperProps {
  open: boolean;
  dialogTitle: string;
  dialogContent: JSX.Element;
  dialogControls?: JSX.Element;
  height?: number;
  width?: number;
  isMaximizable?: boolean;
  onClose: () => void;
  onResize?: (isFullScreen: boolean) => void;
}

const useStyles = makeStyles<
  Theme,
  Pick<DialogWrapperProps, 'width' | 'height'>
>((theme: Theme) => ({
  paper: {
    minHeight: (props) => `${props.height}px`,
    minWidth: (props) => `${props.width}px`,
    fontFamily: FontFamily.ROBOTO,
  },
  contentRoot: {
    padding: theme.spacing(0.5, 3, 0, 3),
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const useDialogWrapperStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: theme.palette.divider,
  },
  dialogTitleRoot: {
    padding: theme.spacing(3),
  },
  dialogTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
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
  onResize,
  dialogTitle,
  dialogContent,
  dialogControls,
  height = 790,
  width = 1040,
  isMaximizable = true,
}: DialogWrapperProps) => {
  const classes = useStyles({ height, width });
  const dialogWrapperClasses = useDialogWrapperStyles();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const onChangeSize = (value: boolean): void => {
    setIsFullScreen(value);
    if (onResize) {
      onResize(value);
    }
  };

  return (
    <Dialog
      fullScreen={isFullScreen}
      classes={{ paper: classes.paper }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle className={dialogWrapperClasses.dialogTitleRoot}>
        <Box className={dialogWrapperClasses.dialogTitleContainer}>
          <Typography
            color="textPrimary"
            fontFamily={FontFamily.ROBOTO}
            className={dialogWrapperClasses.dialogTitle}
          >
            {dialogTitle}
          </Typography>
          {isMaximizable && (
            <IconButton onClick={() => onChangeSize(!isFullScreen)}>
              <MaximizeIcon />
            </IconButton>
          )}
        </Box>
      </DialogTitle>
      <DialogContent className={classes.contentRoot}>
        {dialogContent}
        <Divider />
        <Box className={dialogWrapperClasses.dialogControls}>
          {dialogControls}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

DialogWrapper.defaultProps = {
  dialogControls: <></>,
  onResize: () => {},
  height: 790,
  width: 1040,
  isMaximizable: true,
};

export default DialogWrapper;
