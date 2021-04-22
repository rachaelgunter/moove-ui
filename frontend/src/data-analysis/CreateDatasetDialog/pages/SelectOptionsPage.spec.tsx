import React from 'react';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@material-ui/core';

import theme from 'src/app/styles';
import CreateDatasetContext, {
  CreateDatasetFormState,
  CreateDatasetProvider,
} from '../CreateDatasetContext';
import SelectOptionsPage from './SelectOptionsPage';

jest.mock('src/index', () => Promise.resolve());
jest.mock('@apollo/client', () => ({
  useLazyQuery: () => [
    jest.fn(),
    {
      data: {
        tableColumns: [
          { name: 'geography', type: 'GEOGRAPHY' },
          { name: 'timestamp', type: 'TIMESTAMP' },
          { name: 'float', type: 'FLOAT' },
        ],
      },
      loading: false,
    },
  ],
  gql: jest.fn(),
}));

const createWrapper = async (contextValue: CreateDatasetProvider) =>
  render(
    <MockedProvider>
      <ThemeProvider theme={theme}>
        <CreateDatasetContext.Provider value={contextValue}>
          <SelectOptionsPage />
        </CreateDatasetContext.Provider>
      </ThemeProvider>
    </MockedProvider>,
  );

describe('SelectOptionsPage', () => {
  let wrapper: RenderResult;

  const dispatch = jest.fn();
  const state = {
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

    name: '',
    description: '',
    pageHaveError: false,
    selectedFile: null,
    creationTerminated: false,
    loading: false,
    currentStep: 1,
    stepAmount: 2,
  } as CreateDatasetFormState;

  beforeEach(async () => {
    await act(async () => {
      wrapper = await createWrapper({
        state,
        dispatch,
      });
    });
  });

  describe('required fields are not filled', () => {
    it('should set error to true', () => {
      expect(dispatch).toBeCalledWith({
        pageHaveError: true,
      });
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
        fireEvent.change(latSelectEl, { target: { value: 'float' } });
        fireEvent.change(lonSelectEl, { target: { value: 'float' } });
        fireEvent.change(timestampSelectEl, { target: { value: 'timestamp' } });
      });

      expect(dispatch).toHaveBeenCalledWith({
        timestampColumn: 'timestamp',
      });
      expect(dispatch).toHaveBeenCalledWith({
        latLonColumns: {
          lon: '',
          lat: 'float',
        },
      });
      expect(dispatch).toHaveBeenCalledWith({
        latLonColumns: {
          lon: 'float',
          lat: '',
        },
      });
    });
  });
});
