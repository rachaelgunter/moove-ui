import { useLazyQuery, useMutation } from '@apollo/client';
import { Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import React, { FC, useContext, useState } from 'react';

import { FontFamily } from 'src/app/styles/fonts';
import { UserContext } from 'src/auth/UserProvider';
import Typography from 'src/shared/Typography';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check.svg';
import { ReactComponent as ErrorIcon } from 'src/assets/images/warning.svg';
import { SelectOptionsPage, SelectSourcePage } from './pages';
import CreateDatasetControls from './CreateDatasetControls';
import CreateDatasetStepper from './CreateDatasetStepper';
import {
  CREATE_BQ_DATASET_MUTATION,
  CREATE_FILE_DATASET_MUTATION,
} from '../mutations';
import { DATASET_FILE_UPLOAD_LINK_QUERY } from '../queries';
import { TableIdentity } from '../types';
import CreateDatasetMessage, {
  CreateDatasetMessageProps,
} from './CreateDatasetMessage';
import useStyles from './useStyles';
import CreateDatasetContext, {
  CreateDatasetType,
  LatLonData,
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

  const [pageHaveError, setPageError] = useState(false);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [selectedTable, setSelectedTable] = useState<TableIdentity | null>(
    null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [creationCompleted, setCreationCompleted] = useState(false);
  const [creationError, setCreationError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [geographyColumn, setGeographyColumn] = useState<string>('');
  const [latLonColumns, setLatLonColumns] = useState<LatLonData>({
    lat: '',
    lon: '',
  });
  const [timestampColumn, setTimestampColumn] = useState<string>('');
  const [groupByColumn, setGroupByColumn] = useState<string>('');
  const [jenkColsColumns, setJenkColsColumns] = useState<Array<string>>([]);

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

    setGeographyColumn('');
    setLatLonColumns({
      lat: '',
      lon: '',
    });
    setTimestampColumn('');
    setGroupByColumn('');
    setJenkColsColumns([]);

    if (!BQCreationLoading || fileCreationLoading) {
      // timeout to avoid visible content changes during close transition
      setTimeout(() => {
        setName('');
        setDescription('');
        setSelectedTable(null);
        setSelectedFile(null);
        setCreationCompleted(false);
        setCreationError(null);
        setPageError(false);
        setCurrentStep(0);
      }, 200);
    }
  };

  const handleNameChange = (updatedName: string) => {
    setName(updatedName);
  };
  const handleDescriptionChange = (updatedDescription: string) => {
    setDescription(updatedDescription);
  };
  const handleErrorStatusChange = (value: boolean) => {
    setPageError(value);
  };
  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };
  const handleGeographyColumnChange = (column: string) => {
    setGeographyColumn(column);
  };
  const handleLatLonColumnsChange = (columns: LatLonData) => {
    setLatLonColumns(columns);
  };
  const handleTimestampColumnChange = (column: string) => {
    setTimestampColumn(column);
  };
  const handleGroupByColumnChange = (column: string) => {
    setGroupByColumn(column);
  };
  const handleJenkColsColumnsChange = (columns: Array<string>) => {
    setJenkColsColumns(columns);
  };

  const handleTableSelect = (tableIdentity: TableIdentity | null) => {
    if (tableIdentity) {
      const { projectId, datasetId, tableId } = tableIdentity;
      setSelectedTable({ projectId, datasetId, tableId });
      return;
    }
    setSelectedTable(null);
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
          primaryTimestamp: timestampColumn,
          primaryGeography: geographyColumn,
          groupBy: groupByColumn,
          jenksCols: jenkColsColumns,
          ...latLonColumns,
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
          organizationName: organization,
          analysisName: name,
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

  const handleStepChange = (newStep: number) => {
    if (newStep < 0 || newStep > steps.length - 1) {
      return;
    }

    setCurrentStep(newStep);
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

  const contextValue: CreateDatasetType = {
    name,
    description,
    pageHaveError,
    selectedTable,
    selectedFile,
    creationTerminated: Boolean(creationCompleted || creationError),
    loading: fileCreationLoading || BQCreationLoading,
    currentStep,
    stepAmount: steps.length,
    geographyColumn,
    latLonColumns,
    timestampColumn,
    groupByColumn,
    jenkColsColumns,
    handleNameChange,
    handleDescriptionChange,
    handleErrorStatusChange,
    handleStepChange,
    handleTableSelect,
    handleFileSelect,
    handleClose,
    handleDatasetCreation,
    handleGeographyColumnChange,
    handleLatLonColumnsChange,
    handleTimestampColumnChange,
    handleGroupByColumnChange,
    handleJenkColsColumnsChange,
  };
  const PageComponent = steps[currentStep].component;

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
        <CreateDatasetContext.Provider value={contextValue}>
          {creationCompleted || creationError ? (
            <CreateDatasetMessage {...getCreationMessageProps()} />
          ) : (
            <>
              <CreateDatasetStepper
                steps={steps.map(({ label }) => label)}
                currentStep={currentStep}
              />
              <div className={classes.pageWrapper}>
                <PageComponent />
              </div>
            </>
          )}
          <Divider />
          <CreateDatasetControls />
        </CreateDatasetContext.Provider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDatasetDialog;
