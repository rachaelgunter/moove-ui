import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

import PageTemplate from 'src/shared/PageTemplate';
import { DatasetModel, DatasetStatus } from 'src/data-analysis/types';
import { NoDatasetsHint } from './hints';
import AddDatasetButton from './AddDatasetButton';
import DatasetList from './DatasetList';
import DatasetDetails from './DatasetDetails';

// TODO remove
const initialData = [
  {
    id: 0,
    name: 'Dataset 1',
    description: 'Description',
    status: DatasetStatus.PROCESSING,
    totalRows: 0,
    creationDate: '',
  },
  {
    id: 1,
    name: 'Dataset 2',
    description: 'Description',
    status: DatasetStatus.ACTIVE,
    totalRows: 30506000,
    creationDate: '03/01/2019 1:00 PM',
  },
  {
    id: 2,
    name: 'Dataset 3',
    description: 'Description',
    status: DatasetStatus.ACTIVE,
    totalRows: 6726993,
    creationDate: '22/10/2019 8:00 PM',
  },
  {
    id: 3,
    name: 'Dataset 4',
    description: 'Description',
    status: DatasetStatus.ACTIVE,
    totalRows: 23424,
    creationDate: '03/01/2020 1:00 PM',
  },
];

const DataAnalysis: React.FC = () => {
  const [datasets] = useState<DatasetModel[]>(initialData);
  const [selectedDataset, setSelectedDataset] = useState<DatasetModel | null>(
    null,
  );

  const onAddDatasetClick = () => {};

  const onDatasetSelect = (dataset: DatasetModel) => {
    setSelectedDataset(dataset);
  };

  return (
    <PageTemplate title="Data analysis">
      <Grid container direction="column" spacing={2}>
        <Grid item container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="subtitle1">Datasets</Typography>
          </Grid>
          <Grid item>
            <AddDatasetButton onClick={onAddDatasetClick} />
          </Grid>
        </Grid>
        {datasets.length ? (
          <Grid item container spacing={2}>
            <Grid item xs={3}>
              <DatasetList
                datasets={datasets}
                selectedDataset={selectedDataset}
                onSelect={onDatasetSelect}
              />
            </Grid>
            {selectedDataset && (
              <DatasetDetails datasetModel={selectedDataset} />
            )}
          </Grid>
        ) : (
          <NoDatasetsHint />
        )}
      </Grid>
    </PageTemplate>
  );
};

export default DataAnalysis;
