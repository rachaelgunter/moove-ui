import React, { FC, useState } from 'react';
import {
  Button,
  Link,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { FontFamily } from 'src/app/styles/fonts';
import Typography from 'src/shared/Typography';

const useStyles = makeStyles((theme: Theme) => {
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
      color: '#e57373',
    },
  };
});

const Archiver: FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    console.warn('open');
    setOpen(true);
  };

  const onCancel = () => {
    console.warn('cencal');
    setOpen(false);
  };

  const onDelete = () => {
    console.warn('delete');
    setOpen(false);
  };

  return (
    <>
      <Link className={classes.link} component="button" onClick={onOpen}>
        <Typography color="textPrimary" variant="body1">
          Archive
        </Typography>
      </Link>
      {/* <DialogWrapper /> */}
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            color="textPrimary"
            fontFamily={FontFamily.ROBOTO}
            className={classes.dialogTitle}
          >
            You are about to delete this dataset.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography color="textSecondary" fontFamily={FontFamily.ROBOTO}>
            This action cannot be undone. Do you want to proceed?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button classes={{ root: classes.dialogButton }} onClick={onCancel}>
            Canсel
          </Button>
          <Button
            classes={{ root: classes.dialogButton }}
            className={classes.primaryButton}
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Archiver;
