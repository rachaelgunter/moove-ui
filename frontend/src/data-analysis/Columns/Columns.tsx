import React, { FC, useState } from 'react';
import {
  Grid,
  TableRow,
  Typography,
  Theme,
  makeStyles,
} from '@material-ui/core';

import Table, { TableCell } from 'src/shared/Table/Table';
import { ColumnModel } from '../types';

const rowNames = ['Name', 'Type', 'Populated %', 'Min', 'Max']; // TODO rename to rowTitle
const minNumberOfRowsForDisplaying = 5;
const step = 5;

const useStyles = makeStyles((theme: Theme) => ({
  firstCell: {
    fontSize: 15,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

interface ColumnsProps {
  columnModels: ColumnModel[];
}

const Columns: FC<ColumnsProps> = ({ columnModels }: ColumnsProps) => {
  const classes = useStyles();

  const [quota, setQuota] = useState(minNumberOfRowsForDisplaying);

  const onShowMoreClick = () => setQuota(quota + step);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="subtitle1">Columns</Typography>
      </Grid>
      <Grid item>
        <Table
          rowNames={rowNames}
          onShowMoreClick={onShowMoreClick}
          hasShowMore
        >
          {columnModels.slice(0, quota).map((column) => (
            <TableRow key={column.name}>
              <TableCell className={classes.firstCell}>{column.name}</TableCell>
              <TableCell>{column.type}</TableCell>
              <TableCell>{column.populated}</TableCell>
              <TableCell>{column.min}</TableCell>
              <TableCell>{column.max}</TableCell>
            </TableRow>
          ))}
        </Table>
      </Grid>
    </Grid>
  );
};

export default Columns;
