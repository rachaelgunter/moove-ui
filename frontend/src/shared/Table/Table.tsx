import React, { FC, ReactElement } from 'react';
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableFooter,
  TablePagination,
  makeStyles,
} from '@material-ui/core';

import PaginationActions from 'src/data-analysis/PreviewTable/PaginationActions';
import TableCell from './TableCell';
import ControlTools from './ControlTools';

interface TableProps {
  columnNames: string[];
  children: ReactElement[];
  hasControlTools?: boolean;
  hasPagination?: boolean;
  totalRows?: number;
  rowsPerPage?: number;
  page?: number;
  onShowMoreClick?: () => void;
  onShowLessClick?: () => void;
  handlePageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  handleChangeRowsPerPage?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

const useStyles = makeStyles(() => ({
  pagination: {
    width: '100%',
    backgroundColor: '#303c43',
    borderTop: '1px solid rgba(255, 255, 255, .2)',
  },
  selectIcon: {
    color: '#fff',
  },
}));

const Table: FC<TableProps> = ({
  columnNames,
  children,
  hasControlTools = false,
  hasPagination = false,
  totalRows = 10,
  rowsPerPage = 10,
  page = 0,
  handlePageChange = () => {},
  handleChangeRowsPerPage = () => {},
  ...props
}: TableProps) => {
  const classes = useStyles();

  const onShowMoreClick = () => {
    props.onShowMoreClick && props.onShowMoreClick();
  };

  const onShowLessClick = () => {
    props.onShowLessClick && props.onShowLessClick();
  };

  return (
    <>
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
      {hasPagination && (
        <TablePagination
          classes={{
            selectIcon: classes.selectIcon,
          }}
          className={classes.pagination}
          rowsPerPageOptions={[10, 30, 50, 100]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            native: true,
          }}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={PaginationActions}
        />
      )}
    </>
  );
};

Table.defaultProps = {
  hasControlTools: false,
  hasPagination: false,
  totalRows: 10,
  rowsPerPage: 10,
  page: 0,
  onShowMoreClick: undefined,
  onShowLessClick: undefined,
  handleChangeRowsPerPage: undefined,
  handlePageChange: undefined,
};

export default Table;
