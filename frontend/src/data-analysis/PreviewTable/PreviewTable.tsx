import React, { FC, useState } from 'react';
import {
  CircularProgress,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
  TablePagination,
  Typography,
  Grid,
  Theme,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { DatasetModel } from '../types';
import { BIG_QUERY_PREVIEW_TABLE_QUERY } from '../queries';
import PaginationActions from './PaginationActions';
import { FontFamily } from '../../app/styles/fonts';

const PROJECT_ID = 'moove-platform-testing-data';

interface PreviewTableProps {
  datasetModel: DatasetModel;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
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
    fontWeight: 'normal',
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
  tablePreview: {
    position: 'relative',
    width: '100%',
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
}));

type RowCell = {
  value: string | null;
  id: string;
};
type Row = { rowId: number; row: RowCell[] };

const PreviewTable: FC<PreviewTableProps> = ({
  datasetModel,
}: PreviewTableProps) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { loading, data } = useQuery(BIG_QUERY_PREVIEW_TABLE_QUERY, {
    fetchPolicy: 'no-cache',
    variables: {
      projectId: PROJECT_ID,
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

  if (!data || !data.previewTable) {
    if (loading) {
      return (
        <Grid
          item
          container
          direction="column"
          spacing={2}
          className={classes.root}
        >
          <CircularProgress />
        </Grid>
      );
    }
    return null;
  }

  const {
    rows,
    tableMetadata: { totalRows },
  } = data.previewTable;
  const count = parseInt(totalRows, 10);

  const rowIndexedById: Row[] = rows.map((row: string[], i: number) => ({
    rowId: i,
    row: row.map((value, j) => ({
      id: `${i}-${j}`,
      value,
    })),
  }));

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
        <div className={classes.tablePreview}>
          {loading && (
            <div className={classes.overlay}>
              <CircularProgress />
            </div>
          )}
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              aria-label="simple table"
              size="small"
              className={classes.table}
            >
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
        </div>
        <TablePagination
          classes={{
            selectIcon: classes.selectIcon,
          }}
          className={classes.pagination}
          rowsPerPageOptions={[5, 10, 30, 50, 100, 200]}
          component="div"
          count={count}
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
      </Grid>
    </Grid>
  );
};

export default PreviewTable;
