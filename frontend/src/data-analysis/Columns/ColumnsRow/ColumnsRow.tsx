import React, { FC } from 'react';
import { TableRow, Theme, makeStyles } from '@material-ui/core';

import { ColumnModel } from 'src/data-analysis/types';
import { TableCell } from 'src/shared/Table';

const useStyles = makeStyles((theme: Theme) => ({
  firstCell: {
    fontSize: 15,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

interface ColumnsRowsProps {
  columnModel: ColumnModel;
}

const ColumnsRow: FC<ColumnsRowsProps> = ({
  columnModel,
}: ColumnsRowsProps) => {
  const classes = useStyles();

  return (
    <TableRow key={columnModel.name} data-testid="columns-table-row">
      {Object.keys(columnModel).map((key, index) => (
        <TableCell
          className={!index ? classes.firstCell : undefined}
          key={`${columnModel.name}-${key}`}
        >
          {columnModel[key]}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default ColumnsRow;
