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
import ControlTools from './ControlTools';

interface TableProps {
  columnNames: string[];
  children: ReactElement[];
  hasControlTools?: boolean;
  onShowMoreClick?: () => void;
  onShowLessClick?: () => void;
}

const Table: FC<TableProps> = ({
  columnNames,
  children,
  hasControlTools = false,
  ...props
}: TableProps) => {
  const onShowMoreClick = () => {
    props.onShowMoreClick && props.onShowMoreClick();
  };

  const onShowLessClick = () => {
    props.onShowLessClick && props.onShowLessClick();
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
        {hasControlTools && (
          <TableFooter>
            <ControlTools
              onShowMoreClick={onShowMoreClick}
              onShowLessClick={onShowLessClick}
              colSpan={columnNames.length}
            />
          </TableFooter>
        )}
      </MuiTable>
    </TableContainer>
  );
};

Table.defaultProps = {
  hasControlTools: false,
  onShowMoreClick: undefined,
  onShowLessClick: undefined,
};

export default Table;
