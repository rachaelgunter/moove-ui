import React, { FC, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

import Table from 'src/shared/Table';
import { ColumnModel } from '../types';
import ColumnsRow from './ColumnsRow';

const COLUMNS = ['Name', 'Type', 'Populated %', 'Min', 'Max', ''];
export const INIT_NUMBER_OF_ROWS = 5;
export const STEP = 5;

interface ColumnsProps {
  columnModels: ColumnModel[];
}

const Columns: FC<ColumnsProps> = ({ columnModels }: ColumnsProps) => {
  const [quota, setQuota] = useState(INIT_NUMBER_OF_ROWS);

  const onShowMoreClick = () => setQuota(quota + STEP);
  const onShowLessClick = () => setQuota(INIT_NUMBER_OF_ROWS);
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
          onShowLessClick={onShowLessClick}
          hasControlTools
        >
          {getColumnsByQuota().map((column) => (
            <ColumnsRow
              columnModel={column}
              key={`columns-row-${column.name}`}
            />
          ))}
        </Table>
      </Grid>
    </Grid>
  );
};

export default Columns;
