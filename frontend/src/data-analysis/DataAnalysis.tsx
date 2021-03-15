import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';

import PageTemplate from 'src/shared/PageTemplate';
import { DatasetModel, DatasetStatus } from 'src/data-analysis/types';
import { NoDatasetsHint } from './hints';
import AddDatasetButton from './AddDatasetButton';
import DatasetList from './DatasetList';
import DatasetDetails from './DatasetDetails';
import CreateDatasetDialog from './CreateDatasetDialog/CreateDatasetDialog';

function createData( // TODO remove
  name: string,
  type: string,
  populated: number,
  min: string | number,
  max: string | number,
) {
  return { name, type, populated, min, max };
}

const columns = [
  createData('ID', 'string', 100, 123, 99875),
  createData('Friction', 'float', 98.5, 0.1, 9.8),
  createData('Last', 'float', 99.5, 1000000, 2000000),
  createData('Long', 'float', 99.5, 1200020, 3200020),
  createData('Date', 'Timestamp', 100, 'June 1, 2019', 'June 30, 2020'),
  createData('ID', 'string', 100, 123, 99875),
  createData('Friction', 'float', 98.5, 0.1, 9.8),
  createData('Last', 'float', 99.5, 1000000, 2000000),
  createData('Long', 'float', 99.5, 1200020, 3200020),
  createData('Date', 'Timestamp', 100, 'June 1, 2019', 'June 30, 2020'),
  createData('ID', 'string', 100, 123, 99875),
  createData('Friction', 'float', 98.5, 0.1, 9.8),
  createData('Last', 'float', 99.5, 1000000, 2000000),
  createData('Long', 'float', 99.5, 1200020, 3200020),
  createData('Date', 'Timestamp', 100, 'June 1, 2019', 'June 30, 2020'),
];

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
    name: 'denver_friction',
    description: 'Description',
    status: DatasetStatus.ACTIVE,
    totalRows: 6726993,
    creationDate: '22/10/2019 8:00 PM',
    columns,
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

  const [isCreationDialogOpen, setIsCreationDialogOpen] = useState(false);

  const onAddDatasetClick = () => {
    setIsCreationDialogOpen(true);
  };

  const handleCreationDialogClose = () => {
    setIsCreationDialogOpen(false);
  };

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
      <CreateDatasetDialog
        open={isCreationDialogOpen}
        onClose={handleCreationDialogClose}
      />
    </PageTemplate>
  );
};

export default DataAnalysis;
