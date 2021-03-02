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
      width: '20%',

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
  hasShowMore?: boolean;
  onShowMoreClick?: () => void;
}

const Table: FC<TableProps> = ({
  rowNames,
  children,
  hasShowMore = false,
  ...props
}: TableProps) => {
  const onShowMoreClick = () => {
    props.onShowMoreClick && props.onShowMoreClick();
  };

  return (
    <TableContainer component={Paper}>
      <MuiTable aria-label="columns table">
        {hasShowMore && (
          <caption>
            <Grid justify="center" container item spacing={3}>
              <Button onClick={onShowMoreClick}>Show More</Button>
            </Grid>
          </caption>
        )}
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

// TODO ????
Table.defaultProps = {
  hasShowMore: false,
  onShowMoreClick: undefined,
};

export default Table;
