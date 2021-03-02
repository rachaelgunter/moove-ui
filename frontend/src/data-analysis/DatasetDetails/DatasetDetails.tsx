import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { DatasetModel, DatasetStatus } from 'src/data-analysis/types';
import { IngestionInProgressHint } from 'src/data-analysis/hints';
import DatasetDetailsHeader from './DatasetDetailsHeader';
import Columns from '../Columns/Columns';

export interface DatasetDetailsProps {
  datasetModel: DatasetModel;
}

const useStyles = makeStyles({
  hintWrapper: {
    position: 'relative',
  },
});

const DatasetDetails: React.FC<DatasetDetailsProps> = ({
  datasetModel,
}: DatasetDetailsProps) => {
  const classes = useStyles();

  return (
    <Grid item container direction="column" spacing={4} xs>
      <Grid item>
        <DatasetDetailsHeader datasetModel={datasetModel} />
      </Grid>
      {datasetModel.status === DatasetStatus.PROCESSING && (
        <Grid item className={classes.hintWrapper}>
          <IngestionInProgressHint />
        </Grid>
      )}
      {datasetModel.columns && (
        <Grid item>
          <Columns columnModels={datasetModel.columns} />
        </Grid>
      )}
    </Grid>
  );
};

export default DatasetDetails;
