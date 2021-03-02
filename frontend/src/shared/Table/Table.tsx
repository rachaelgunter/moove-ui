import React, { FC, ReactElement } from 'react';
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core';

interface TableProps {
  rowNames: string[];
  children: ReactElement[];
}

const Table: FC<TableProps> = ({ rowNames, children }: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable size="small" aria-label="a dense table">
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
