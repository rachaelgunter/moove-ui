import React, { FC, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

import Table from 'src/shared/Table';
import { ColumnModel } from '../types';
import ColumnsRow from './ColumnsRow';

const COLUMNS = ['Name', 'Type', 'Populated %', 'Min', 'Max'];
const MIN_NUMBER_OF_ROWS_FOR_DISPLAYING = 5;
const STEP = 5;

interface ColumnsProps {
  columnModels: ColumnModel[];
}

const Columns: FC<ColumnsProps> = ({ columnModels }: ColumnsProps) => {
  const [quota, setQuota] = useState(MIN_NUMBER_OF_ROWS_FOR_DISPLAYING);

  const onShowMoreClick = () => setQuota(quota + STEP);
  const getColumnsByQuota = () => columnModels.slice(0, quota);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="subtitle1">Columns</Typography>
      </Grid>
      <Grid item>
        <Table
          columnNames={COLUMNS}
          onShowMoreClick={onShowMoreClick}
          hasShowMore
        >
          {getColumnsByQuota().map((column) => (
            <ColumnsRow columnModel={column} />
          ))}
        </Table>
      </Grid>
    </Grid>
  );
};

export default Columns;
