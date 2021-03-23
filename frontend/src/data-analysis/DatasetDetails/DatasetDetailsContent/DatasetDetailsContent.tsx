import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { DatasetModel, DatasetStatus } from 'src/data-analysis/types';
import { IngestionInProgressHint } from 'src/data-analysis/hints';
import Columns from 'src/data-analysis/Columns';
import DatasetVisualization from 'src/data-analysis/DatasetVisualization';
import PreviewTable from 'src/data-analysis/PreviewTable';

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

  if (datasetModel.status === DatasetStatus.PROCESSING) {
    return (
      <Grid item className={classes.hintWrapper}>
        <IngestionInProgressHint />
      </Grid>
    );
  }

  return (
    <>
      <Columns datasetModel={datasetModel} />
      <PreviewTable datasetModel={datasetModel} />
      <DatasetVisualization datasetModel={datasetModel} />
    </>
  );
};

export default DatasetDetailsContent;
