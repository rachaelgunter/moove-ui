import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { FontFamily } from 'src/app/styles/fonts';
import TextField from 'src/shared/TextField';
import Typography from 'src/shared/Typography';
import TablesTreeView from '../TablesTreeView/TablesTreeView';

const MAX_DESCRIPTION_LENGTH = 16384;
export const DESCRIPTION_MAX_LENGTH_ERROR =
  'Maximum description length is limited to 16384 characters';
interface CreateDatasetDialogProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      fontFamily: FontFamily.ROBOTO,
    },
    contentRoot: {
      padding: theme.spacing(0.5, 3, 0, 3),
    },
    divider: {
      backgroundColor: theme.palette.divider,
    },
    tablesView: {
      margin: '24px 0 59px 0',
    },
    tablesViewTitle: {
      marginBottom: theme.spacing(2),
    },
    dialogControls: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: theme.spacing(6),
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
  };
});

const CreateDatasetDialog: FC<CreateDatasetDialogProps> = ({
  open,
  onClose,
}: CreateDatasetDialogProps) => {
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [name, setName] = useState('');

  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const onNameChange = (updatedName: string) => {
    setName(updatedName);
  };

  const onDescriptionChange = (updatedDescription: string) => {
    setDescription(updatedDescription);
    updateDescriptionErrorState(updatedDescription);
  };

  const updateDescriptionErrorState = (updatedDescription: string) => {
    if (updatedDescription.length > MAX_DESCRIPTION_LENGTH) {
      setDescriptionError(DESCRIPTION_MAX_LENGTH_ERROR);
    } else {
      setDescriptionError('');
    }
  };

  const isCreateButtonEnabled = () => {
    return name.length && description.length && !descriptionError.length;
  };

  return (
    <Dialog
      maxWidth="lg"
      className={classes.root}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle className={classes.dialogTitleRoot}>
        <Typography
          color="textPrimary"
          fontFamily={FontFamily.ROBOTO}
          className={classes.dialogTitle}
        >
          New Dataset
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.contentRoot}>
        <TextField label="Name" value={name} onChange={onNameChange} />
        <TextField
          label="Description"
          value={description}
          onChange={onDescriptionChange}
          error={!!descriptionError.length}
          errorText={descriptionError}
          multiline
        />
        <Divider className={classes.divider} />
        <Box className={classes.tablesView}>
          <Typography
            className={classes.tablesViewTitle}
            fontFamily={FontFamily.ROBOTO}
          >
            Choose a BigQuery table
          </Typography>
          <TablesTreeView />
        </Box>
        <Divider className={classes.divider} />
        <Box className={classes.dialogControls}>
          <Button className={classes.dialogButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={!isCreateButtonEnabled()}
            className={classes.dialogButton}
          >
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDatasetDialog;
