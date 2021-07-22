import React, { FC, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import AutoSizer from 'react-virtualized-auto-sizer';
import { UserContext } from 'src/auth/UserProvider';
import { KEPLER_DATA_QUERY } from '../queries';
import KeplerWrapper from './KeplerWrapper';
import { ColumnType, KeplerDataQueryResponse, KeplerDataset } from '../types';

interface ColumnViewMapProps {
  columnName: string;
  analysisName: string;
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
  errorMessage: {
    marginTop: '10px',
  },
}));

export const getData = (
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
      rows: keplerData.rows.map((values: string[]) =>
        values.map((value: string, index: number) => {
          return parseDataFromString(value, keplerData.headers[index].type);
        }),
      ),
    },
  };
};

const parseDataFromString = (data: string, type: ColumnType) =>
  [ColumnType.FLOAT, ColumnType.INTEGER, ColumnType.TIMESTAMP].includes(type)
    ? +data
    : data;

const ColumnViewMap: FC<ColumnViewMapProps> = ({
  columnName,
  analysisName,
}: ColumnViewMapProps) => {
  const user = useContext(UserContext);

  const projectId = user.GCPProjectName;
  const datasetId = `${analysisName}_galileo_analysis`;
  const tableId = `${analysisName}_contextualized_sample`;

  const selectedFields = ['source_geom', 'source_timestamp', columnName];

  const { data, loading: dataLoading, error } = useQuery(KEPLER_DATA_QUERY, {
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

  if (error) {
    return (
      <div className={classes.keplerInstanceContainer}>
        <Typography variant="body2" className={classes.errorMessage}>
          Unable to show the map. Could not fetch coordinates for this dataset.
        </Typography>
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
