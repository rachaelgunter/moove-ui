import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { DatasetModel, DatasetStatus } from 'src/data-analysis/types';
import { IngestionInProgressHint } from 'src/data-analysis/hints';
import Columns from 'src/data-analysis/Columns';
import DatasetVisualization from 'src/data-analysis/DatasetVisualization';

interface DatasetDetailsContentProps {
  datasetModel: DatasetModel;
}

const useStyles = makeStyles({
  hintWrapper: {
    position: 'relative',
  },
});

const DatasetDetailsContent: React.FC<DatasetDetailsContentProps> = ({
  datasetModel,
}: DatasetDetailsContentProps) => {
  const classes = useStyles();

  if (datasetModel.status === DatasetStatus.PROCESSING) {
    return (
      <Grid item className={classes.hintWrapper}>
        <IngestionInProgressHint />
      </Grid>
    );
  }

  return (
    <>
      {datasetModel.columns && <Columns columnModels={datasetModel.columns} />}
      <DatasetVisualization datasetModel={datasetModel} />
    </>
  );
};

export default DatasetDetailsContent;
