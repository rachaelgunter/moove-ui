import React, { FC } from 'react';
import { TableRow, Theme, makeStyles, Button } from '@material-ui/core';

import { ColumnModel } from 'src/data-analysis/types';
import { TableCell } from 'src/shared/Table';
import { ReactComponent as MagnifierIcon } from 'src/assets/icons/magnifier.svg';

const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    '&:first-child': {
      fontSize: 15,
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  rowActionButton: {
    fontSize: 11,
    height: '28px',
    borderRadius: theme.spacing(2),
    textAlign: 'center',
    border: 'solid 1px',
    borderColor: theme.palette.divider,
    textTransform: 'none',
    fontWeight: 300,
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
        <TableCell className={classes.cell} key={`${columnModel.name}-${key}`}>
          {columnModel[key]}
        </TableCell>
      ))}
      <TableCell className={classes.cell}>
        <Button
          startIcon={<MagnifierIcon />}
          className={classes.rowActionButton}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ColumnsRow;
