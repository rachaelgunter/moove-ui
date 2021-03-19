import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { DatasetModel, DatasetStatus } from 'src/data-analysis/types';
import { IngestionInProgressHint } from 'src/data-analysis/hints';
import Columns from 'src/data-analysis/Columns';
import DatasetVisualization from 'src/data-analysis/DatasetVisualization';
import { useQuery } from '@apollo/client';
import { DATASET_COLUMNS_QUERY } from 'src/data-analysis/queries';

interface DatasetDetailsContentProps {
  datasetModel: DatasetModel;
}

const useStyles = makeStyles({
  hintWrapper: {
    position: 'relative',
  },
  columnsTableLoadingPlaceholder: {
    width: '100%',
    height: '430px',
    margin: '-8px',
  },
});

const DatasetDetailsContent: React.FC<DatasetDetailsContentProps> = ({
  datasetModel,
}: DatasetDetailsContentProps) => {
  const classes = useStyles();

  const { data: datasetColumns } = useQuery(DATASET_COLUMNS_QUERY, {
    variables: {
      projectId: 'moove-platform-testing-data',
      datasetId: `${datasetModel.name}_galileo_analysis`,
      tableId: `${datasetModel.name}_general_stats`,
    },
  });

  if (datasetModel.status === DatasetStatus.PROCESSING) {
    return (
      <Grid item className={classes.hintWrapper}>
        <IngestionInProgressHint />
      </Grid>
    );
  }

  return (
    <>
      {datasetColumns?.columnsTable?.length ? (
        <Columns columnModels={datasetColumns?.columnsTable ?? []} />
      ) : (
        <div className={classes.columnsTableLoadingPlaceholder} />
      )}

      <DatasetVisualization datasetModel={datasetModel} />
    </>
  );
};

export default DatasetDetailsContent;
