import React, { FC, ReactElement } from 'react';
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableFooter,
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
        <TableHead>
          <TableRow key="table-head-row">
            {columnNames.map((name: string) => (
              <TableCell align="left" key={`table-head-row-${name}`}>
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
        {hasShowMore && (
          <TableFooter>
            <ShowMoreButton
              onClick={onShowMoreClick}
              colSpan={columnNames.length}
            />
          </TableFooter>
        )}
      </MuiTable>
    </TableContainer>
  );
};

Table.defaultProps = {
  hasShowMore: false,
  onShowMoreClick: undefined,
};

export default Table;
