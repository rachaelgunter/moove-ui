import React from 'react';
import { DatasetModel } from 'src/data-analysis/types';
import { Grid } from '@material-ui/core';
import DatasetDetailsHeader from './DatasetDetailsHeader';
import DatasetDetailsContent from './DatasetDetailsContent';

export interface DatasetDetailsProps {
  datasetModel: DatasetModel;
  resetDatasetModel: () => void;
}

const DatasetDetails: React.FC<DatasetDetailsProps> = ({
  datasetModel,
  resetDatasetModel,
}: DatasetDetailsProps) => {
  return (
    <Grid item xs={9}>
      <Grid item container direction="column" spacing={2}>
        <Grid item>
          <DatasetDetailsHeader
            datasetModel={datasetModel}
            resetDatasetModel={resetDatasetModel}
          />
        </Grid>
        <Grid item container>
          <DatasetDetailsContent datasetModel={datasetModel} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DatasetDetails;
