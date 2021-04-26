import React, { Dispatch } from 'react';

import { TableIdentity } from 'src/data-analysis/types';

export type LatLonData = {
  lat: string;
  lon: string;
};

export enum DatasourceSelectorMode {
  BIG_QUERY,
  LOCAL_FILES_UPLOAD,
}

export type CreateDatasetFormState = {
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
  latLonColumns: LatLonData;
  timestampColumn: string;
  groupByColumn: string;
  jenkColsColumns: Array<string>;
  datasourceSelectorMode: DatasourceSelectorMode;
  bigQuerySelectorExpandedRows: string[];
};

export interface CreateDatasetProvider {
  state: CreateDatasetFormState;
  dispatch: Dispatch<Partial<CreateDatasetFormState>>;
}

export const initialState: CreateDatasetFormState = {
  name: '',
  description: '',
  pageHaveError: false,
  selectedTable: null,
  selectedFile: null,
  creationTerminated: false,
  loading: false,
  currentStep: 0,
  stepAmount: 0,
  geographyColumn: '',
  latLonColumns: {
    lat: '',
    lon: '',
  },
  timestampColumn: '',
  groupByColumn: '',
  jenkColsColumns: [],
  datasourceSelectorMode: DatasourceSelectorMode.BIG_QUERY,
  bigQuerySelectorExpandedRows: [],
};

const CreateDatasetContext = React.createContext<CreateDatasetProvider>({
  state: initialState,
  dispatch: () => {},
});

export default CreateDatasetContext;
