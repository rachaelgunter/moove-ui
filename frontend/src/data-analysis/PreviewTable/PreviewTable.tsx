import React, { FC, useContext, useState } from 'react';
import { makeStyles, Typography, Grid, Theme } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import TableOverlay from 'src/shared/TableOverlay/TableOverlay';
import { UserContext } from 'src/auth/UserProvider';
import { DatasetModel } from '../types';
import { BIG_QUERY_PREVIEW_TABLE_QUERY } from '../queries';
import { FontFamily } from '../../app/styles/fonts';
import PreviewTableContent from './PreviewTableContent';

interface PreviewTableProps {
  datasetModel: DatasetModel;
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
