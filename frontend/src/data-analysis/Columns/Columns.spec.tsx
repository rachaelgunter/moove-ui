import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';

import theme from 'src/app/styles';
import {
  SHOW_MORE_BUTTON_TITLE,
  SHOW_LESS_BUTTON_TITLE,
} from 'src/shared/Table';
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
      <Columns datasetName="name" columnModels={columns} />
    </ThemeProvider>,
  );

describe('Columns', () => {
  let wrapper: RenderResult;
  let showMoreButton: HTMLButtonElement;
  let showLessButton: HTMLButtonElement;

  beforeEach(() => {
    wrapper = createWrapper();
    showMoreButton = wrapper
      .getByText(SHOW_MORE_BUTTON_TITLE)
      .closest('button') as HTMLButtonElement;
    showLessButton = wrapper
      .getByText(SHOW_LESS_BUTTON_TITLE)
      .closest('button') as HTMLButtonElement;
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
