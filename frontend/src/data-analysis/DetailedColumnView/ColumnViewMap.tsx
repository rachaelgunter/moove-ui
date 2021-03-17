import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, makeStyles } from '@material-ui/core';
import AutoSizer from 'react-virtualized-auto-sizer';
import { KEPLER_DATA_QUERY } from '../queries';
import KeplerWrapper from './KeplerWrapper';
import { KeplerDataQueryResponse, KeplerDataset } from '../types';

interface ColumnViewMapProps {
  columnName: string;
}

const KEPLER_DATASET_SIZE = 20000;

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

const getData = (
  data: KeplerDataQueryResponse,
  columnName: string,
): KeplerDataset => {
  const { previewTable: keplerData } = data;

  return {
    info: {
      label: columnName,
      id: `${columnName} analysis_data`,
    },
    data: {
      fields: keplerData.headers,
      rows: keplerData.rows,
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

  const { data, loading: dataLoading } = useQuery(KEPLER_DATA_QUERY, {
    variables: {
      datasetId,
      projectId,
      tableId,
      selectedFields,
      limit: KEPLER_DATASET_SIZE,
    },
  });

  const classes = useStyles();

  if (dataLoading) {
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
            data={getData(data, columnName)}
            width={width}
            height={height}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default ColumnViewMap;
