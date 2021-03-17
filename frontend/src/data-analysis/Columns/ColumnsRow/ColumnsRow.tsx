import React, { FC } from 'react';
import { TableRow, Theme, makeStyles } from '@material-ui/core';

import { ColumnModel } from 'src/data-analysis/types';
import { TableCell } from 'src/shared/Table';

const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    '&:first-child': {
      fontSize: 15,
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}));

interface ColumnsRowsProps {
  columnModel: ColumnModel;
}

const ColumnsRow: FC<ColumnsRowsProps> = ({
  columnModel,
}: ColumnsRowsProps) => {
  const classes = useStyles();

  const transformColumnModel = ({
    name,
    type,
    populated,
    min,
    max,
  }: ColumnModel) => {
    return [name, type, populated, min, max];
  };

  return (
    <TableRow key={columnModel.name} data-testid="columns-table-row">
      {transformColumnModel(columnModel).map((cellValue) => (
        <TableCell
          className={classes.cell}
          key={`${columnModel.name}-${cellValue}`}
        >
          {cellValue}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default ColumnsRow;
