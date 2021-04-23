import { ColumnData } from 'src/data-analysis/types';

// eslint-disable-next-line import/prefer-default-export
export const getColumnNamesByType = (
  tableColumns: ColumnData[],
  columnType: string,
): Array<string> => {
  return tableColumns
    .filter(({ type }: ColumnData) => (columnType ? type === columnType : true))
    .map(({ name }: ColumnData) => name);
};
