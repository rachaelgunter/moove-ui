import React, { FC, useState } from 'react';
import { TableRow, Theme, makeStyles, Button } from '@material-ui/core';

import { ColumnModel } from 'src/data-analysis/types';
import { TableCell } from 'src/shared/Table';
import { ReactComponent as MagnifierIcon } from 'src/assets/icons/magnifier.svg';
import DetailedColumnView from 'src/data-analysis/DetailedColumnView/DetailedColumnView';

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

const columnsOrder = ['name', 'type', 'populated', 'min', 'max'];

interface ColumnsRowsProps {
  columnModel: ColumnModel;
  datasetName: string;
}

const ColumnsRow: FC<ColumnsRowsProps> = ({
  columnModel,
  datasetName,
}: ColumnsRowsProps) => {
  const classes = useStyles();
  const [isDetailedColumnViewOpened, setDetailedColumnViewOpened] = useState(
    false,
  );
  const [detailedViewColumn, setDetailedViewColumn] = useState<string>('');

  const openDetailedColumnView = (columnName: string) => {
    setDetailedColumnViewOpened(true);
    setDetailedViewColumn(columnName);
  };

  const closeDetailedColumnView = () => {
    setDetailedColumnViewOpened(false);
  };

  return (
    <TableRow key={columnModel.name} data-testid="columns-table-row">
      {columnsOrder.map((name) => (
        <TableCell className={classes.cell} key={`${columnModel.name}-${name}`}>
          {columnModel[name]}
        </TableCell>
      ))}
      <TableCell className={classes.cell}>
        <Button
          startIcon={<MagnifierIcon />}
          className={classes.rowActionButton}
          onClick={() => openDetailedColumnView(columnModel.name)}
        >
          View
        </Button>
      </TableCell>
      <DetailedColumnView
        open={isDetailedColumnViewOpened}
        onClose={closeDetailedColumnView}
        columnName={detailedViewColumn}
        datasetName={datasetName}
      />
    </TableRow>
  );
};

export default ColumnsRow;
