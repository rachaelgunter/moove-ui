import React from 'react';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ThemeProvider } from '@material-ui/core';

import theme from 'src/app/styles';
import { BIG_QUERY_TABLE_COLUMNS_QUERY } from 'src/data-analysis/queries';
import CreateDatasetContext, {
  CreateDatasetType,
} from '../CreateDatasetContext';
import SelectOptionsPage from './SelectOptionsPage';

jest.mock('src/index', () => Promise.resolve());

const columnsMock: MockedResponse = {
  request: {
    query: BIG_QUERY_TABLE_COLUMNS_QUERY,
    variables: {
      projectId: 'moove-platform-testing-data',
      datasetId: `dataset_galileo_analysis`,
      tableId: `dataset_general_stats`,
    },
  },
  result: {
    data: { tableColumns: [] },
  },
};

const createWrapper = async (contextValue: CreateDatasetType) =>
  render(
    <MockedProvider mocks={[columnsMock]} addTypename={false}>
      <ThemeProvider theme={theme}>
        <CreateDatasetContext.Provider value={contextValue}>
          <SelectOptionsPage />
        </CreateDatasetContext.Provider>
      </ThemeProvider>
    </MockedProvider>,
  );

describe('SelectOptionsPage', () => {
  let wrapper: RenderResult;

  const handleTimestampColumnChange = jest.fn();
  const handleGroupByColumnChange = jest.fn();
  const handleJenkColsColumnsChange = jest.fn();
  const handleErrorStatusChange = jest.fn();
  const handleLatLonColumnsChange = jest.fn();

  const context = {
    selectedTable: {
      projectId: 'moove-platform-testing-data',
      datasetId: `dataset_galileo_analysis`,
      tableId: `dataset_general_stats`,
    },
    latLonColumns: {
      lat: '',
      lon: '',
    },
    geographyColumn: '',
    timestampColumn: '',
    groupByColumn: '',
    jenkColsColumns: [],
    handleTimestampColumnChange,
    handleGroupByColumnChange,
    handleJenkColsColumnsChange,
    handleErrorStatusChange,
    handleLatLonColumnsChange,

    name: '',
    description: '',
    pageHaveError: false,
    selectedFile: null,
    creationTerminated: false,
    loading: false,
    currentStep: 1,
    stepAmount: 2,
    handleNameChange: jest.fn(),
    handleDescriptionChange: jest.fn(),
    handleStepChange: jest.fn(),
    handleTableSelect: jest.fn(),
    handleFileSelect: jest.fn(),
    handleClose: jest.fn(),
    handleDatasetCreation: jest.fn(),
    handleGeographyColumnChange: jest.fn(),
  } as CreateDatasetType;

  beforeEach(async () => {
    await act(async () => {
      wrapper = await createWrapper(context);
    });
  });

  describe('required fields are not filled', () => {
    it('should set error to true', () => {
      expect(handleErrorStatusChange).toBeCalledWith(true);
    });
  });

  describe('required fields are filled', () => {
    it('should set error to false', async () => {
      const latSelectEl =
        wrapper.getByTestId('LatLonSelector__lat').querySelector('input') ||
        ({} as HTMLElement);
      const lonSelectEl =
        wrapper.getByTestId('LatLonSelector__lon').querySelector('input') ||
        ({} as HTMLElement);
      const timestampSelectEl =
        wrapper
          .getByTestId('SelectOptionsPage__timestamp')
          .querySelector('input') || ({} as HTMLElement);

      await act(async () => {
        fireEvent.change(latSelectEl, { target: { value: 'latitude' } });
        fireEvent.focusOut(latSelectEl);

        fireEvent.change(lonSelectEl, { target: { value: 'longitude' } });
        fireEvent.focusOut(lonSelectEl);

        fireEvent.change(timestampSelectEl, { target: { value: 'timestamp' } });
        fireEvent.focusOut(timestampSelectEl);
      });

      expect(handleTimestampColumnChange).toHaveBeenLastCalledWith('timestamp');
      expect(handleLatLonColumnsChange).toHaveBeenCalledWith({
        lon: '',
        lat: 'latitude',
      });
      expect(handleTimestampColumnChange).toHaveBeenLastCalledWith({
        lon: 'longitude',
        lat: 'latitude',
      });
    });
  });
});
