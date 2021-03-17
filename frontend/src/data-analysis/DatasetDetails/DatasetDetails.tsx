import React from 'react';
import { Grid } from '@material-ui/core';

import { DatasetModel } from 'src/data-analysis/types';
import DatasetDetailsHeader from './DatasetDetailsHeader';
import DatasetDetailsContent from './DatasetDetailsContent';

export interface DatasetDetailsProps {
  datasetModel: DatasetModel;
}

const DatasetDetails: React.FC<DatasetDetailsProps> = ({
  datasetModel,
}: DatasetDetailsProps) => {
  return (
    <Grid item container direction="column" spacing={4} xs>
      <Grid item container>
        <DatasetDetailsHeader datasetModel={datasetModel} />
      </Grid>
      <DatasetDetailsContent datasetModel={datasetModel} />
    </Grid>
  );
};

export default DatasetDetails;
