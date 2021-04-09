import React, { FC, useState } from 'react';
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  TablePagination,
  Button,
  IconButton,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PaginationActions from './PaginationActions';
import { FontFamily } from '../../app/styles/fonts';
import PreviewSegment from '../PreviewSegment/PreviewSegment';

const useStylesTable = makeStyles(() => ({
  container: {
    maxHeight: 440,
    fontSize: '13px',
    position: 'relative',
  },
  table: {
    borderRadius: '4px',
    '& tr > :first-child': {
      padding: '11px 0 11px 24px',
      width: '30px',
    },
  },
  headerCell: {
    borderColor: 'rgba(255, 255, 255, .2)',
    backgroundColor: '#303c43',
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: FontFamily.POPPINS,
    fontSize: '13px',
    lineHeight: 'normal',
    padding: '14px 24px 11px 24px',
    whiteSpace: 'nowrap',
  },
  cell: {
    backgroundColor: '#303c43',
    borderColor: 'rgba(255, 255, 255, .2)',
    fontFamily: FontFamily.POPPINS,
    color: '#fff',
    fontSize: '13px',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    padding: '11px 24px 11px 24px',
  },
  pagination: {
    width: '100%',
    backgroundColor: '#303c43',
    borderTop: '1px solid rgba(255, 255, 255, .2)',
  },
  selectIcon: {
    color: '#fff',
  },
  button: {
    fontSize: '13px',
  },
  toggleButton: {
    color: '#fff',
  },
}));

interface PreviewTableHeaderCell {
  name: string;
}
interface PreviewTableCell {
  id: string;
  cell: string | null;
}
interface PreviewTableRow {
  id: string;
  row: PreviewTableCell[];
}
interface PreviewTableRows {
  id: string;
  rows: PreviewTableRow[];
}
interface PreviewTableData {
  headers: PreviewTableHeaderCell[];
  groupedRows: PreviewTableRows[];
  tableMetadata: { totalRows: number };
}
interface PreviewTableContentProps extends PreviewTableData {
  page: number;
  rowsPerPage: number;
  handleChangePage: () => void;
  handleChangeRowsPerPage: () => void;
}

const isSegmentValue = (value: string | null): boolean =>
  !!value && /^here:cm:segment:\d+$/.test(value);

const PreviewTableContent: FC<PreviewTableContentProps> = ({
  headers,
  groupedRows,
  tableMetadata: { totalRows },
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}: PreviewTableContentProps) => {
  const classes = useStylesTable();
  const [segmentValue, setSegmentValue] = useState('');
  const [openedSubrows, setOpenedSubrows] = useState(new Set());
  const [isPreviewSegmentOpened, sedPreviewSegmentOpened] = useState(false);

  const openPreviewSegment = (value: string) => {
    setSegmentValue(value);
    sedPreviewSegmentOpened(true);
  };

  const closePreviewSegment = () => {
    sedPreviewSegmentOpened(false);
  };

  const toggleRows = (id: string) => {
    openedSubrows.has(id) ? openedSubrows.delete(id) : openedSubrows.add(id);
    setOpenedSubrows(new Set(openedSubrows));
  };

  const renderRow = ({ id, row }: PreviewTableRow, isSubRow = true) => (
    <TableRow key={id}>
      <TableCell className={classes.headerCell}>
        {!isSubRow && (
          <IconButton
            className={classes.toggleButton}
            aria-label="expand row"
            size="small"
            onClick={() => toggleRows(id)}
          >
            {openedSubrows.has(id) ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        )}
      </TableCell>
      {row.map(({ id: cellId, cell }) => (
        <TableCell key={cellId} className={classes.cell}>
          {isSegmentValue(cell) ? (
            <Button
              className={classes.button}
              variant="text"
              onClick={() => openPreviewSegment(cell || '')}
            >
              {cell}
            </Button>
          ) : (
            cell
          )}
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <div>
      <PreviewSegment
        open={isPreviewSegmentOpened}
        onClose={closePreviewSegment}
        segment={segmentValue}
      />
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          aria-label="simple table"
          size="small"
          className={classes.table}
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell} />
              {headers.map((item: { name: string }) => (
                <TableCell key={item.name} className={classes.headerCell}>
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {groupedRows.map(({ id: groupId, rows: [firstRow, ...subrows] }) => (
            <>
              {renderRow(firstRow, false)}
              {openedSubrows.has(firstRow.id) && (
                <TableBody>{subrows.map((row) => renderRow(row))}</TableBody>
              )}
            </>
          ))}
        </Table>
      </TableContainer>
      <TablePagination
        classes={{
          selectIcon: classes.selectIcon,
        }}
        className={classes.pagination}
        rowsPerPageOptions={[5, 10, 30, 50, 100, 200]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={PaginationActions}
      />
    </div>
  );
};

export default PreviewTableContent;
