import { useLazyQuery, useMutation } from '@apollo/client';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from '@material-ui/core';
import React, { FC, useContext, useState } from 'react';
import { FontFamily } from 'src/app/styles/fonts';
import { UserContext } from 'src/auth/UserProvider';
import TextField from 'src/shared/TextField';
import Typography from 'src/shared/Typography';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check.svg';
import { ReactComponent as ErrorIcon } from 'src/assets/images/warning.svg';

import {
  CREATE_BQ_DATASET_MUTATION,
  CREATE_FILE_DATASET_MUTATION,
} from '../mutations';
import { DATASET_FILE_UPLOAD_LINK_QUERY } from '../queries';
import { TableIdentity } from '../types';
import CreateDatasetMessage, {
  CreateDatasetMessageProps,
} from './CreateDatasetMessage';
import DatasourceSelector from './DatasourceSelector/DatasourceSelector';
import useStyles from './useStyles';

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

const CreateDatasetDialog: FC<CreateDatasetDialogProps> = ({
  open,
  onClose,
  onComplete,
}: CreateDatasetDialogProps) => {
  const classes = useStyles();

  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [selectedTable, setSelectedTable] = useState<TableIdentity | null>(
    null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [creationCompleted, setCreationCompleted] = useState(false);
  const [creationError, setCreationError] = useState<string | null>(null);
  const { GCPProjectName, GCSBucketName, organization } = useContext(
    UserContext,
  );

  const [createBQDataset, { loading: BQCreationLoading }] = useMutation(
    CREATE_BQ_DATASET_MUTATION,
    {
      onCompleted: () => {
        setCreationCompleted(true);
        onComplete();
      },
      onError: (e) => setCreationError(e.message),
    },
  );

  const [createFileDataset, { loading: fileCreationLoading }] = useMutation(
    CREATE_FILE_DATASET_MUTATION,
    {
      onCompleted: () => {
        setCreationCompleted(true);
        onComplete();
      },
      onError: (e) => setCreationError(e.message),
    },
  );

  const [getUploadLink] = useLazyQuery(DATASET_FILE_UPLOAD_LINK_QUERY, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ datasetFileSignedUploadUrl }) =>
      uploadFile(datasetFileSignedUploadUrl).then(() =>
        createFileDataset({
          variables: {
            datasetParams: {
              name,
              description,
              organizationName: organization,
              analysisProject: GCPProjectName,
              assetsBucket: GCSBucketName,
              fileName: selectedFile?.name ?? '',
            },
          },
        }),
      ),
  });

  const handleClose = () => {
    onClose();

    if (!BQCreationLoading || fileCreationLoading) {
      // timeout to avoid visible content changes during close transition
      setTimeout(() => {
        setName('');
        setDescription('');
        setSelectedTable(null);
        setSelectedFile(null);
        setCreationCompleted(false);
        setCreationError(null);
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

  const handleTableSelect = (tableIdentity: TableIdentity | null) => {
    if (tableIdentity) {
      const { projectId, datasetId, tableId } = tableIdentity;
      setSelectedTable({ projectId, datasetId, tableId });
    }
    setSelectedTable(null);
  };

  const isCreateButtonEnabled = () => {
    return (
      name.length &&
      !descriptionError.length &&
      (selectedTable !== null || selectedFile !== null) &&
      !(fileCreationLoading || BQCreationLoading)
    );
  };

  const handleDatasetCreationFromBQTable = () => {
    createBQDataset({
      variables: {
        datasetParams: {
          name,
          description,
          organizationName: organization,
          analysisProject: GCPProjectName,
          assetsBucket: GCSBucketName,
          ...selectedTable,
        },
      },
    });
  };

  const handleDatasetCreationFromFile = () => {
    if (selectedFile) {
      getUploadLink({
        variables: {
          fileName: selectedFile?.name ?? '',
        },
      });
    }
  };

  const uploadFile = async (link: string) => {
    return fetch(link, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      method: 'PUT',
      body: selectedFile,
    });
  };

  const handleDatasetCreation = () => {
    if (selectedFile) {
      handleDatasetCreationFromFile();
      return;
    }
    handleDatasetCreationFromBQTable();
  };

  const getCreationMessageProps = (): CreateDatasetMessageProps => {
    return {
      message: creationError
        ? 'Unable to start ingestion'
        : 'Dataset successfully imported',
      messageHint: creationError
        ? 'We were unable to create dataset. Please examine your data'
        : `The ingestion process may take longer depending on the size of the
      imported data.`,
      Icon: creationError ? ErrorIcon : CheckIcon,
    };
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
        {creationCompleted || creationError ? (
          <CreateDatasetMessage {...getCreationMessageProps()} />
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
            <DatasourceSelector
              onTableSelect={handleTableSelect}
              onFileSelect={setSelectedFile}
            />
          </>
        )}

        <Divider className={classes.divider} />
        <Box className={classes.dialogControls}>
          <Button
            disabled={fileCreationLoading || BQCreationLoading}
            className={classes.dialogButton}
            onClick={handleClose}
          >
            {creationCompleted || creationError ? 'Close' : 'Cancel'}
          </Button>
          {!(creationCompleted || creationError) && (
            <Button
              disabled={!isCreateButtonEnabled()}
              className={classes.dialogButton}
              onClick={handleDatasetCreation}
            >
              {!(fileCreationLoading || BQCreationLoading) ? (
                'Create'
              ) : (
                <CircularProgress size="1em" />
              )}
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDatasetDialog;
