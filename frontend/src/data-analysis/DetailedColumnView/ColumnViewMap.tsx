/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, makeStyles } from '@material-ui/core';
import AutoSizer from 'react-virtualized-auto-sizer';
import { KEPLER_DATA_QUERY, KEPLER_STRUCTURE_QUERY } from '../queries';
import KeplerWrapper from './KeplerWrapper';

const useStyles = makeStyles(() => ({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
  },
  keplerInstanceContainer: {
    flex: '1 1 auto',
  },
}));

const getData = (rows: any, columns: any): any => {
  const { tableData } = rows;
  const { tableInfo } = columns;

  return {
    info: {
      label: 'Analysis results',
      id: 'analysis_data',
    },
    data: {
      fields: tableInfo.schema.fields,
      rows: tableData.rows.map((row: { f: any[] }) =>
        row.f.map((field: { v: any }) => field.v),
      ),
    },
  };
};

const ColumnViewMap: FC = () => {
  const projectId = 'moove-platform-testing-data';
  const datasetId = 'denver_friction_galileo_analysis';
  const tableId = 'denver_friction_contextualized_sample';

  const { data: rows, loading: rowsLoading } = useQuery(KEPLER_DATA_QUERY, {
    variables: { datasetId, projectId, tableId },
  });
  const { data: columns, loading: columnsLoading } = useQuery(
    KEPLER_STRUCTURE_QUERY,
    {
      variables: { datasetId, projectId, tableId },
    },
  );

  const classes = useStyles();

  if (rowsLoading || columnsLoading) {
    return (
      <div className={classes.keplerInstanceContainer}>
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.keplerInstanceContainer}>
      <AutoSizer>
        {({ width, height }) => (
          <KeplerWrapper
            data={getData(rows, columns)}
            width={width}
            height={height}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default ColumnViewMap;
