import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { DatasetModel, DatasetStatus } from 'src/data-analysis/types';
import { IngestionInProgressHint } from 'src/data-analysis/hints';
import Columns from 'src/data-analysis/Columns';
import DatasetVisualization from 'src/data-analysis/DatasetVisualization';
import PreviewTable from 'src/data-analysis/PreviewTable';
import IngestionFailureHint from 'src/data-analysis/hints/IngestionFailureHint';
import { HintTemplateBaseProps } from 'src/data-analysis/hints/HintTemplate';

interface DatasetDetailsContentProps {
  datasetModel: DatasetModel;
}

const useStyles = makeStyles({
  hintWrapper: {
    position: 'relative',
    width: '100%',
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

  const hintsStatusesMap: {
    [key in DatasetStatus]: React.FC<HintTemplateBaseProps> | null;
  } = {
    [DatasetStatus.ACTIVE]: null,
    [DatasetStatus.PROCESSING]: IngestionInProgressHint,
    [DatasetStatus.FAILED]: IngestionFailureHint,
  };

  const Hint = hintsStatusesMap[datasetModel.status];

  if (Hint) {
    return (
      <Grid item className={classes.hintWrapper}>
        <Hint datasetModel={datasetModel} />
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
