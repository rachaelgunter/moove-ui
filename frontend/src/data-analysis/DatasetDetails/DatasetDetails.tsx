import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';

import { DatasetModel, DatasetStatus } from 'src/data-analysis/types';
import { IngestionInProgressHint } from 'src/data-analysis/hints';
import DatasetDetailsHeader from './DatasetDetailsHeader';
import Columns from '../Columns';

export interface DatasetDetailsProps {
  datasetModel: DatasetModel;
}

const useStyles = makeStyles((theme: Theme) => ({
  hintWrapper: {
    position: 'relative',
  },
  marginBottom: {
    marginBottom: theme.spacing(4),
  },
}));

const DatasetDetails: React.FC<DatasetDetailsProps> = ({
  datasetModel,
}: DatasetDetailsProps) => {
  const classes = useStyles();

  return (
    <Grid item container direction="column" xs>
      <Grid item className={classes.marginBottom}>
        <DatasetDetailsHeader datasetModel={datasetModel} />
      </Grid>
      {datasetModel.status === DatasetStatus.PROCESSING && (
        <Grid item className={classes.hintWrapper}>
          <IngestionInProgressHint />
        </Grid>
      )}
      {datasetModel.columns && (
        <Grid item className={classes.marginBottom}>
          <Columns columnModels={datasetModel.columns} />
        </Grid>
      )}
    </Grid>
  );
};

export default DatasetDetails;
