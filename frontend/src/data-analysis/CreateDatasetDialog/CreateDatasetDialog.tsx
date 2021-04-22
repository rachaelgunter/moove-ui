import { useLazyQuery, useMutation } from '@apollo/client';
import { Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import React, { FC, useContext, useEffect, useReducer, useState } from 'react';

import { FontFamily } from 'src/app/styles/fonts';
import { UserContext } from 'src/auth/UserProvider';
import Typography from 'src/shared/Typography';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check.svg';
import { ReactComponent as ErrorIcon } from 'src/assets/images/warning.svg';
import { ADMIN_AREAS_MAP } from 'src/data-analysis/CreateDatasetDialog/pages/SelectOptionsPage';
import { SelectOptionsPage, SelectSourcePage } from './pages';
import CreateDatasetControls from './CreateDatasetControls';
import CreateDatasetStepper from './CreateDatasetStepper';
import {
  CREATE_BQ_DATASET_MUTATION,
  CREATE_FILE_DATASET_MUTATION,
} from '../mutations';
import { DATASET_FILE_UPLOAD_LINK_QUERY } from '../queries';
import CreateDatasetMessage, {
  CreateDatasetMessageProps,
} from './CreateDatasetMessage';
import useStyles from './useStyles';
import CreateDatasetContext, {
  CreateDatasetFormState,
  initialState,
} from './CreateDatasetContext';

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

  const steps = [
    {
      label: 'Select source',
      component: SelectSourcePage,
    },
    {
      label: 'Select options',
      component: SelectOptionsPage,
    },
  ];

  const [state, dispatch] = useReducer<
    (
      state: CreateDatasetFormState,
      action: Partial<CreateDatasetFormState>,
    ) => CreateDatasetFormState
  >(
    (currentState, action): CreateDatasetFormState => ({
      ...currentState,
      ...action,
    }),
    {
      ...initialState,
      stepAmount: steps.length,
    },
  );
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
              name: state.name,
              description: state.description,
              organizationName: organization,
              analysisProject: GCPProjectName,
              assetsBucket: GCSBucketName,
              fileName: state.selectedFile?.name ?? '',
            },
          },
        }),
      ),
  });

  useEffect(() => {
    dispatch({
      stepAmount: steps.length,
    });
  }, [steps.length]);

  useEffect(() => {
    dispatch({
      loading: Boolean(fileCreationLoading || BQCreationLoading),
    });
  }, [fileCreationLoading, BQCreationLoading]);

  useEffect(() => {
    dispatch({
      creationTerminated: Boolean(creationCompleted || creationError),
    });
  }, [creationCompleted, creationError]);

  const handleClose = () => {
    onClose();
    if (!BQCreationLoading || fileCreationLoading) {
      setTimeout(() => {
        dispatch({
          ...initialState,
          stepAmount: steps.length,
        });
        setCreationCompleted(false);
        setCreationError(null);
      }, 200);
    }
  };

  const handleDatasetCreationFromBQTable = () => {
    createBQDataset({
      variables: {
        datasetParams: {
          name: state.name,
          description: state.description,
          organizationName: organization,
          analysisProject: GCPProjectName,
          assetsBucket: GCSBucketName,
          primaryTimestamp: state.timestampColumn,
          primaryGeography: state.geographyColumn,
          groupBy: ADMIN_AREAS_MAP[state.groupByColumn],
          jenksCols: state.jenkColsColumns,
          ...state.latLonColumns,
          ...state.selectedTable,
        },
      },
    });
  };

  const handleDatasetCreationFromFile = () => {
    if (state.selectedFile) {
      getUploadLink({
        variables: {
          fileName: state.selectedFile?.name ?? '',
          organizationName: organization,
          analysisName: state.name,
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
      body: state.selectedFile,
    });
  };

  const handleDatasetCreation = () => {
    if (state.selectedFile) {
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

  const PageComponent = steps[state.currentStep].component;

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
        <CreateDatasetContext.Provider
          value={{
            state,
            dispatch,
          }}
        >
          {creationCompleted || creationError ? (
            <CreateDatasetMessage {...getCreationMessageProps()} />
          ) : (
            <>
              <CreateDatasetStepper
                steps={steps.map(({ label }) => label)}
                currentStep={state.currentStep}
              />
              <div className={classes.pageWrapper}>
                <PageComponent />
              </div>
            </>
          )}
          <Divider />
          <CreateDatasetControls
            handleClose={handleClose}
            handleDatasetCreation={handleDatasetCreation}
          />
        </CreateDatasetContext.Provider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDatasetDialog;
