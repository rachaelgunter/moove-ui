import React, { FC, useContext, useState } from 'react';
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  TablePagination,
  Typography,
  Grid,
  Theme,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import TableOverlay from 'src/shared/TableOverlay/TableOverlay';
import { UserContext } from 'src/auth/UserProvider';
import { DatasetModel } from '../types';
import { BIG_QUERY_PREVIEW_TABLE_QUERY } from '../queries';
import PaginationActions from './PaginationActions';
import { FontFamily } from '../../app/styles/fonts';

interface PreviewTableProps {
  datasetModel: DatasetModel;
}

type RowCell = {
  value: string | null;
  id: string;
};
type Row = { rowId: number; row: RowCell[] };

interface PreviewTableHeaderCell {
  name: string;
}

interface PreviewTableData {
  headers: PreviewTableHeaderCell[];
  rows: string[][];
  tableMetadata: { totalRows: number };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
  overlayWrapper: {
    position: 'relative',
    width: '100%',
    minHeight: '440px',
  },
  overlay: {
    opacity: 0.5,
    backgroundColor: '#000',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    width: '100%',
    height: 440,
    zIndex: 10,
  },
  errorMessage: {
    fontFamily: FontFamily.POPPINS,
    color: '#fff',
    fontSize: '13px',
    minHeight: '440px',
  },
}));
const useStylesTable = makeStyles((theme: Theme) => ({
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

interface PreviewTableContentProps extends PreviewTableData {
  page: number;
  rowsPerPage: number;
  handleChangePage: () => void;
  handleChangeRowsPerPage: () => void;
}
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

  return (
    <div>
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
                    {value}
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

const PreviewTable: FC<PreviewTableProps> = ({
  datasetModel,
}: PreviewTableProps) => {
  const user = useContext(UserContext);

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { loading, data, error } = useQuery(BIG_QUERY_PREVIEW_TABLE_QUERY, {
    fetchPolicy: 'no-cache',
    variables: {
      projectId: user.GCPProjectName,
      datasetId: `${datasetModel.name}_galileo_analysis`,
      tableId: `${datasetModel.name}_contextualized`,
      offset: page * rowsPerPage,
      limit: rowsPerPage,
    },
  });
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid
      item
      container
      direction="column"
      spacing={2}
      className={classes.root}
    >
      <Grid item>
        <Typography variant="subtitle1">Preview</Typography>
      </Grid>
      <Grid container item>
        <TableOverlay loading={loading} error={!!error} data={data}>
          <PreviewTableContent
            {...{
              ...data?.previewTable,
              handleChangePage,
              handleChangeRowsPerPage,
              rowsPerPage,
              page,
            }}
          />
        </TableOverlay>
      </Grid>
    </Grid>
  );
};

export default PreviewTable;
