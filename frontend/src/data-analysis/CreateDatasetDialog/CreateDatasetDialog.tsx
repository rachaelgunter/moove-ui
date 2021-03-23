import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  CircularProgress,
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
import { CREATE_DATASET_MUTATION } from '../mutations';
import TablesTreeView from '../TablesTreeView/TablesTreeView';
import { TableIdentity } from '../types';
import CreateDatasetSuccessMessage from './CreateDatasetSuccessMessage';

const MAX_DESCRIPTION_LENGTH = 16384;
export const DESCRIPTION_MAX_LENGTH_ERROR =
  'Maximum description length is limited to 16384 characters';
export const DATASET_NAME_ERROR =
  'Name should contain only alphanumeric characters, underscores or dashes';

interface CreateDatasetDialogProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    paper: {
      minHeight: '660px',
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
  onComplete,
}: CreateDatasetDialogProps) => {
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [selectedTable, setSelectedTable] = useState<TableIdentity | null>(
    null,
  );
  const [creationCompleted, setCreationCompleted] = useState(false);

  const [createDataset, { loading }] = useMutation(CREATE_DATASET_MUTATION, {
    onCompleted: () => {
      setCreationCompleted(true);
      onComplete();
    },
  });

  const classes = useStyles();

  const handleClose = () => {
    onClose();

    if (!loading) {
      // timeout to avoid visible content changes during close transition
      setTimeout(() => {
        setName('');
        setDescription('');
        setSelectedTable(null);
        setCreationCompleted(false);
      }, 200);
    }
  };

  const onNameChange = (updatedName: string) => {
    setName(updatedName);
    updateNameErrorState(updatedName);
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

  const updateNameErrorState = (updatedName: string) => {
    if (updatedName.match(/^[a-zA-Z0-9-_]*$/)) {
      setNameError('');
    } else {
      setNameError(DATASET_NAME_ERROR);
    }
  };

  const handleTableSelect = ({
    projectId,
    datasetId,
    tableId,
  }: TableIdentity) => {
    setSelectedTable({ projectId, datasetId, tableId });
  };

  const isCreateButtonEnabled = () => {
    return (
      name.length &&
      !descriptionError.length &&
      selectedTable !== null &&
      !loading
    );
  };

  const handleDatasetCreation = () => {
    createDataset({
      variables: {
        datasetParams: { name, description, ...selectedTable },
      },
    });
  };

  return (
    <Dialog
      maxWidth="lg"
      className={classes.paper}
      classes={{ paper: classes.paper }}
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
        {creationCompleted ? (
          <CreateDatasetSuccessMessage />
        ) : (
          <>
            <TextField
              label="Name"
              value={name}
              onChange={onNameChange}
              error={!!nameError.length}
              errorText={nameError}
            />
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
              <TablesTreeView onTableSelect={handleTableSelect} />
            </Box>
          </>
        )}

        <Divider className={classes.divider} />
        <Box className={classes.dialogControls}>
          <Button
            disabled={loading}
            className={classes.dialogButton}
            onClick={handleClose}
          >
            {creationCompleted ? 'Close' : 'Cancel'}
          </Button>
          {!creationCompleted && (
            <Button
              disabled={!isCreateButtonEnabled()}
              className={classes.dialogButton}
              onClick={handleDatasetCreation}
            >
              {!loading ? 'Create' : <CircularProgress size="1em" />}
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDatasetDialog;
