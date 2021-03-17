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

const columnsOrder = ['name', 'type', 'populated', 'min', 'max'];

interface ColumnsRowsProps {
  columnModel: ColumnModel;
}

const ColumnsRow: FC<ColumnsRowsProps> = ({
  columnModel,
}: ColumnsRowsProps) => {
  const classes = useStyles();

  return (
    <TableRow key={columnModel.name} data-testid="columns-table-row">
      {columnsOrder.map((name) => (
        <TableCell className={classes.cell} key={`${columnModel.name}-${name}`}>
          {columnModel[name]}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default ColumnsRow;
