/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import AutoSizer from 'react-virtualized-auto-sizer';
import { KEPLER_DATA_QUERY, KEPLER_STRUCTURE_QUERY } from '../queries';
import KeplerWrapper from './KeplerWrapper';

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

  if (rowsLoading || columnsLoading) {
    return <CircularProgress />;
  }

  const { tableData } = rows;
  const { tableInfo } = columns;

  const data = {
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

  return rowsLoading || columnsLoading ? (
    <CircularProgress />
  ) : (
    <div style={{ flex: '1 1 auto' }}>
      <AutoSizer>
        {({ width, height }) => (
          <KeplerWrapper data={data} width={width} height={height} />
        )}
      </AutoSizer>
    </div>
  );
};

export default ColumnViewMap;
