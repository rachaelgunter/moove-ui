import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';

import theme from 'src/app/styles';
import {
  SHOW_MORE_BUTTON_TITLE,
  SHOW_LESS_BUTTON_TITLE,
} from 'src/shared/Table';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { User, UserContext } from 'src/auth/UserProvider';
import Columns, { INIT_NUMBER_OF_ROWS, STEP } from './Columns';
import { ColumnModel, DatasetModel, DatasetStatus } from '../types';
import { DATASET_COLUMNS_QUERY } from '../queries';

function createData(
  name: string,
  type: string,
  populated: number,
  min: string | number,
  max: string | number,
): ColumnModel {
  return {
    name,
    type,
    populated,
    min,
    max,
    average: 0,
    variance: 0,
    sum: 0,
    count: 0,
    standardDeviation: 0,
  };
}
const columns = [] as ColumnModel[];

for (let i = 0; i < 15; i += 1) {
  columns.push(createData(`Test column ${i}`, 'string', 100, 1, 10));
}

const dataset: DatasetModel = {
  id: 1,
  description: 'desc',
  createdAt: '',
  totalRows: 15,
  name: 'dataset',
  status: DatasetStatus.ACTIVE,
};

const columnsMock: MockedResponse = {
  request: {
    query: DATASET_COLUMNS_QUERY,
    variables: {
      projectId: 'moove-platform-testing-data',
      datasetId: `dataset_galileo_analysis`,
      tableId: `dataset_general_stats`,
    },
  },
  result: {
    data: { columnsTable: columns },
  },
};

const userMock: User = {
  GCPProjectName: 'moove-platform-testing-data',
  name: '',
  email: '',
  picture: '',
  roles: [],
  sub: '',
  organization: '',
};

const createWrapper = () =>
  render(
    <ThemeProvider theme={theme}>
      <MockedProvider mocks={[columnsMock]} addTypename={false}>
        <UserContext.Provider value={userMock}>
          <Columns datasetModel={dataset} />
        </UserContext.Provider>
      </MockedProvider>
    </ThemeProvider>,
  );

describe('Columns', () => {
  let wrapper: RenderResult;
  let showMoreButton: HTMLButtonElement;
  let showLessButton: HTMLButtonElement;

  beforeEach(async () => {
    wrapper = createWrapper();

    showMoreButton = (await wrapper.findByText(SHOW_MORE_BUTTON_TITLE)).closest(
      'button',
    ) as HTMLButtonElement;
    showLessButton = (await wrapper.findByText(SHOW_LESS_BUTTON_TITLE)).closest(
      'button',
    ) as HTMLButtonElement;
  });

  describe('should have the initial number of rows', () => {
    it('when Columns has been loaded', () => {
      const rows = wrapper.getAllByTestId('columns-table-row');
      expect(rows.length).toBe(INIT_NUMBER_OF_ROWS);
    });

    it('when ShowLessButton has been clicked', () => {
      fireEvent.click(showMoreButton);
      fireEvent.click(showLessButton);
      const rows = wrapper.getAllByTestId('columns-table-row');
      expect(rows.length).toBe(INIT_NUMBER_OF_ROWS);
    });
  });

  describe('should have the correct number of rows', () => {
    it('when ShowMoreButton has been clicked', () => {
      fireEvent.click(showMoreButton);
      const rows = wrapper.getAllByTestId('columns-table-row');
      expect(rows.length).toBe(INIT_NUMBER_OF_ROWS + STEP);
    });
  });
});
