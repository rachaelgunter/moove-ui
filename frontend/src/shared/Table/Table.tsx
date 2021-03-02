import React, { FC, ReactElement } from 'react';
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell as MuiTableCell,
  TableBody,
  Paper,
  Button as MuiButton,
  Theme,
  Grid,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/styles';

export const TableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderColor: 'rgba(255, 255, 255, 0.2)',
      fontSize: 13,

      '&:first-child': {
        paddingLeft: theme.spacing(3),
      },

      '&:last-child': {
        paddingRight: theme.spacing(3),
      },
    },
    head: {
      color: 'rgba(255, 255, 255, 0.5)',
      padding: theme.spacing(1.5),
    },
    body: {
      padding: theme.spacing(1.25),
    },
  }),
)(MuiTableCell);

export const Button = withStyles((theme: Theme) =>
  createStyles({
    root: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 13,
      textTransform: 'capitalize',
    },
  }),
)(MuiButton);

interface TableProps {
  rowNames: string[];
  children: ReactElement[];
}

const Table: FC<TableProps> = ({ rowNames, children }: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable aria-label="columns table">
        <caption>
          <Grid justify="center" container item spacing={3}>
            <Button onClick={() => {}}>Show More</Button>
          </Grid>
        </caption>
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
