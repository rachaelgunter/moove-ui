import React, { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Theme,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { FontFamily } from 'src/app/styles/fonts';
import Typography from 'src/shared/Typography';

export enum AlertDialogType {
  DANGER = 'danger',
  WARNING = 'warning',
  INFORMATION = 'information',
  SUCCESS = 'success',
}

interface AlertDialogProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  loading?: boolean;
  actionButtonTitle?: string;
  hasAction?: boolean;
  onAction?: () => void;
  type?: AlertDialogType;
}

const useStyles = (type: AlertDialogType) =>
  makeStyles((theme: Theme) => {
    const colorMap = {
      [AlertDialogType.DANGER]: theme.palette.error.light,
      [AlertDialogType.WARNING]: theme.palette.notice,
      [AlertDialogType.INFORMATION]: theme.palette.text.secondary,
      [AlertDialogType.SUCCESS]: theme.palette.positive,
    };

    return {
      link: {
        textAlign: 'left',
        width: '100%',
      },
      dialogTitle: {
        fontWeight: 400,
        fontSize: 18,
      },
      dialogButton: {
        fontFamily: FontFamily.ROBOTO,
        color: theme.palette.text.secondary,
        height: '36px',
        letterSpacing: '1.25px',
        marginLeft: theme.spacing(1),
      },
      primaryButton: {
        color: colorMap[type],
      },
      loader: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: 'auto',
        marginLeft: 'auto',
      },
    };
  })();

const AlertDialog: FC<AlertDialogProps> = ({
  open,
  onClose,
  title,
  message,
  onAction,
  actionButtonTitle,
  type = AlertDialogType.INFORMATION,
  hasAction = false,
  loading = false,
}: AlertDialogProps) => {
  const classes = useStyles(type);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            color="textPrimary"
            fontFamily={FontFamily.ROBOTO}
            className={classes.dialogTitle}
          >
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography color="textSecondary" fontFamily={FontFamily.ROBOTO}>
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress className={classes.loader} size="36px" />
          ) : (
            <>
              <Button
                classes={{ root: classes.dialogButton }}
                onClick={onClose}
              >
                Canсel
              </Button>
              {hasAction && (
                <Button
                  classes={{ root: classes.dialogButton }}
                  className={classes.primaryButton}
                  onClick={onAction}
                >
                  {actionButtonTitle}
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

AlertDialog.defaultProps = {
  type: AlertDialogType.INFORMATION,
  hasAction: false,
  onAction: () => {},
  actionButtonTitle: '',
  loading: false,
};

export default AlertDialog;
