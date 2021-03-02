import React, { FC } from 'react';
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

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="subtitle1">Columns</Typography>
      </Grid>
      <Grid item>
        <Table rowNames={rowNames}>
          {columnModels.map((column) => (
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
