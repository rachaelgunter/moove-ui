import React, { FC, ReactElement } from 'react';
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell as MuiTableCell,
  TableBody,
  Paper,
  Theme,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/styles';

export const TableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    head: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 13,
    },
    body: {
      fontSize: 15,
      fontWeight: 500,
    },
  }),
)(MuiTableCell);

interface TableProps {
  rowNames: string[];
  children: ReactElement[];
}

const Table: FC<TableProps> = ({ rowNames, children }: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable aria-label="columns table">
        <TableHead>
          <TableRow>
            {rowNames.map((name: string) => (
              <TableCell align="left">{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
