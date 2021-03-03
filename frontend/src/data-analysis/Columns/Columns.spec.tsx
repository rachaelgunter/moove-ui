import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';

import theme from 'src/app/styles';
import { SHOW_MORE_BUTTON_TITLE } from 'src/shared/Table';
import Columns, { INIT_NUMBER_OF_ROWS, STEP } from './Columns';
import { ColumnModel } from '../types';

function createData(
  name: string,
  type: string,
  populated: number,
  min: string | number,
  max: string | number,
) {
  return { name, type, populated, min, max };
}

const columns = [] as ColumnModel[];

for (let i = 0; i < 15; i += 1) {
  columns.push(createData(`Test column ${i}`, 'string', 100, 1, 10));
}

const createWrapper = () =>
  render(
    <ThemeProvider theme={theme}>
      <Columns columnModels={columns} />
    </ThemeProvider>,
  );

describe('Columns', () => {
  it('should have the correct number of rows', () => {
    const wrapper = createWrapper();
    const showMoreButton = wrapper
      .getByText(SHOW_MORE_BUTTON_TITLE)
      .closest('button') as HTMLInputElement;

    let rows = wrapper.getAllByTestId('columns-table-row');

    expect(rows.length).toBe(INIT_NUMBER_OF_ROWS);

    fireEvent.click(showMoreButton);

    rows = wrapper.getAllByTestId('columns-table-row');

    expect(rows.length).toBe(INIT_NUMBER_OF_ROWS + STEP);
  });
});
