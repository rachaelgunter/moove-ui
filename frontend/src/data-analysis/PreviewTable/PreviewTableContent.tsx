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
} from '@material-ui/core';
import PaginationActions from './PaginationActions';
import { FontFamily } from '../../app/styles/fonts';
import PreviewSegment from '../PreviewSegment/PreviewSegment';

type RowCell = {
  value: string | null;
  id: string;
};
type Row = { rowId: number; row: RowCell[] };

const useStylesTable = makeStyles(() => ({
  container: {
    maxHeight: 440,
    fontSize: '13px',
    position: 'relative',
  },
  table: {
    borderRadius: '4px',
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
    verticalAlign: 'top',
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
}));

interface PreviewTableHeaderCell {
  name: string;
}
interface PreviewTableData {
  headers: PreviewTableHeaderCell[];
  rows: string[][];
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
  rows,
  tableMetadata: { totalRows },
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}: PreviewTableContentProps) => {
  const rowIndexedById: Row[] = rows.map((row: string[], i: number) => ({
    rowId: i,
    row: row.map((value, j) => ({
      id: `${i}-${j}`,
      value,
    })),
  }));
  const classes = useStylesTable();
  const [segmentValue, setSegmentValue] = useState('');
  const [isPreviewSegmentOpened, sedPreviewSegmentOpened] = useState(false);

  const openPreviewSegment = (value: string) => {
    setSegmentValue(value);
    sedPreviewSegmentOpened(true);
  };

  const closePreviewSegment = () => {
    sedPreviewSegmentOpened(false);
  };

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
              {headers.map((item: { name: string }) => (
                <TableCell key={item.name} className={classes.headerCell}>
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowIndexedById.map(({ rowId, row }) => (
              <TableRow key={rowId}>
                {row.map(({ value, id }) => (
                  <TableCell key={id} className={classes.cell}>
                    {isSegmentValue(value) ? (
                      <Button
                        variant="text"
                        onClick={() => openPreviewSegment(value || '')}
                      >
                        {value}
                      </Button>
                    ) : (
                      value
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
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
