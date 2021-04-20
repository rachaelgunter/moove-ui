import React from 'react';
import { TableIdentity } from 'src/data-analysis/types';

export type LatLonData = {
  lat: string;
  lon: string;
};

export type CreateDatasetType = {
  name: string;
  description: string;
  pageHaveError: boolean;
  selectedTable: TableIdentity | null;
  selectedFile: File | null;
  creationTerminated: boolean;
  loading: boolean;
  currentStep: number;
  stepAmount: number;
  geographyColumn: string;
  latLongColumns: LatLonData;
  timestampColumn: string;
  groupByColumn: string;
  jenkColsColumns: Array<string>;

  handleNameChange: (name: string) => void;
  handleDescriptionChange: (description: string) => void;
  handleErrorStatusChange: (value: boolean) => void;
  handleStepChange: (step: number) => void;
  handleTableSelect: (params: TableIdentity | null) => void;
  handleFileSelect: (file: File | null) => void;
  handleClose: () => void;
  handleDatasetCreation: () => void;
  handleGeographyColumnChange: (column: string) => void;
  handleLatLongColumnsChange: (columns: LatLonData) => void;
  handleTimestampColumnChange: (column: string) => void;
  handleGroupByColumnChange: (column: string) => void;
  handleJenkColsColumnsChange: (columns: Array<string>) => void;
};

const CreateDatasetContext = React.createContext<CreateDatasetType>(
  {} as CreateDatasetType,
);

export default CreateDatasetContext;
