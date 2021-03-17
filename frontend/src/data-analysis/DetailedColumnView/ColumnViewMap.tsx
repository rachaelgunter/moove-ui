/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, makeStyles } from '@material-ui/core';
import AutoSizer from 'react-virtualized-auto-sizer';
import { KEPLER_DATA_QUERY, KEPLER_STRUCTURE_QUERY } from '../queries';
import KeplerWrapper from './KeplerWrapper';

interface ColumnViewMapProps {
  columnName: string;
}

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

const getData = (rows: any, columns: any, columnName: string): any => {
  const { tableData } = rows;
  const { tableInfo } = columns;

  return {
    info: {
      label: columnName,
      id: `${columnName} analysis_data`,
    },
    data: {
      fields: tableInfo.schema.fields,
      rows: tableData.rows.map((row: { f: any[] }) =>
        row.f.map((field: { v: any }) => field.v),
      ),
    },
  };
};

const ColumnViewMap: FC<ColumnViewMapProps> = ({
  columnName,
}: ColumnViewMapProps) => {
  const projectId = 'moove-platform-testing-data';
  const datasetId = 'denver_friction_galileo_analysis';
  const tableId = 'denver_friction_contextualized_sample';

  const selectedFields = ['source_geom', columnName];

  const { data: rows, loading: rowsLoading } = useQuery(KEPLER_DATA_QUERY, {
    variables: { datasetId, projectId, tableId, selectedFields, limit: 20000 },
  });
  const { data: columns, loading: columnsLoading } = useQuery(
    KEPLER_STRUCTURE_QUERY,
    {
      variables: { datasetId, projectId, tableId, selectedFields },
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
            columnName={columnName}
            data={getData(rows, columns, columnName)}
            width={width}
            height={height}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default ColumnViewMap;
