import React, { FC, useState } from 'react';
import { Link, makeStyles } from '@material-ui/core';

import Typography from 'src/shared/Typography';
import AlertDialog from 'src/shared/AlertDialog';
import { AlertDialogType } from 'src/shared/AlertDialog/AlertDialog';

const useStyles = makeStyles({
  link: {
    textAlign: 'left',
    width: '100%',
  },
});

const Archiver: FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    console.warn('open');
    setOpen(true);
  };

  const onCancel = () => {
    console.warn('cancel');
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
      <AlertDialog
        open={open}
        title="You are about to delete this dataset."
        message="This action cannot be undone. Do you want to proceed?"
        actionButtonTitle="Delete"
        onAction={onDelete}
        onClose={onCancel}
        type={AlertDialogType.DANGER}
      />
    </>
  );
};

export default Archiver;
