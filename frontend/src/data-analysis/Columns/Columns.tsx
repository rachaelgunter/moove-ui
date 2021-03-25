import React, { FC, useContext, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

import Table from 'src/shared/Table';
import { useQuery } from '@apollo/client';
import TableOverlay from 'src/shared/TableOverlay/TableOverlay';
import { UserContext } from 'src/auth/UserProvider';
import { ColumnModel, DatasetModel } from '../types';
import ColumnsRow from './ColumnsRow';
import { DATASET_COLUMNS_QUERY } from '../queries';

const COLUMNS = ['Name', 'Type', 'Populated %', 'Min', 'Max', ''];
const COLUMNS_TABLE_MIN_HEIGHT = 336;
export const INIT_NUMBER_OF_ROWS = 5;
export const STEP = 5;

interface ColumnsProps {
  datasetModel: DatasetModel;
}

const Columns: FC<ColumnsProps> = ({ datasetModel }: ColumnsProps) => {
  const user = useContext(UserContext);
  const { data: datasetColumns, loading: columnsLoading, error } = useQuery(
    DATASET_COLUMNS_QUERY,
    {
      variables: {
        projectId: user.GCPProjectName,
        datasetId: `${datasetModel.name}_galileo_analysis`,
        tableId: `${datasetModel.name}_general_stats`,
      },
    },
  );

  const [quota, setQuota] = useState(INIT_NUMBER_OF_ROWS);

  const onShowMoreClick = () => setQuota(quota + STEP);
  const onShowLessClick = () => setQuota(INIT_NUMBER_OF_ROWS);
  const getColumnsByQuota: () => ColumnModel[] = () =>
    datasetColumns.columnsTable?.slice(0, quota);

  return (
    <Grid item container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="subtitle1">Columns</Typography>
      </Grid>
      <Grid item container>
        <TableOverlay
          height={COLUMNS_TABLE_MIN_HEIGHT}
          loading={columnsLoading}
          error={!!error}
          data={datasetColumns?.columnsTable}
        >
          <Table
            columnNames={COLUMNS}
            onShowMoreClick={onShowMoreClick}
            onShowLessClick={onShowLessClick}
            hasControlTools
          >
            {datasetColumns &&
              getColumnsByQuota().map((column) => (
                <ColumnsRow
                  columnModel={column}
                  datasetName={datasetModel.name}
                  key={`columns-row-${column.name}`}
                />
              ))}
          </Table>
        </TableOverlay>
      </Grid>
    </Grid>
  );
};

export default Columns;
