import React, { FC, ReactElement } from 'react';
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from '@material-ui/core';

import TableCell from './TableCell';
import ShowMoreButton from './ShowMoreButton';

interface TableProps {
  columnNames: string[];
  children: ReactElement[];
  hasShowMore?: boolean;
  onShowMoreClick?: () => void;
}

const Table: FC<TableProps> = ({
  columnNames,
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
        {hasShowMore && <ShowMoreButton onClick={onShowMoreClick} />}
        <TableHead>
          <TableRow>
            {columnNames.map((name: string) => (
              <TableCell align="left">{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </MuiTable>
    </TableContainer>
  );
};

Table.defaultProps = {
  hasShowMore: false,
  onShowMoreClick: undefined,
};

export default Table;
