import React, { useState } from 'react';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import PageTemplate from 'src/shared/PageTemplate';
import { DatasetModel } from 'src/data-analysis/types';
import AddDatasetButton from './AddDatasetButton';
import DatasetList from './DatasetList';
import DatasetDetails from './DatasetDetails';
import CreateDatasetDialog from './CreateDatasetDialog/CreateDatasetDialog';
import { DATASET_QUERY } from './queries';
import { getDatasetModels } from './helpers';
import { NoDatasetsHint } from './hints';

function createData( // TODO remove
  name: string,
  type: string,
  populated: number,
  min: string | number,
  max: string | number,
) {
  return { name, type, populated, min, max };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const columns = [
  createData('accelerateVector', 'FLOAT', 100, 123, 99875),
  createData('errorAmplitudeVector', 'FLOAT', 98.5, 0.1, 9.8),
  createData('delivery', 'BOOLEAN', 0, '-', '-'),
  createData('speed_category_offset', 'STRING', 99.5, 1200020, 3200020),
  createData(
    'source_timestamp',
    'TIMESTAMP',
    100,
    'June 1, 2019',
    'June 30, 2020',
  ),
];

const DataAnalysis: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<DatasetModel | null>(
    null,
  );

  const [isCreationDialogOpen, setIsCreationDialogOpen] = useState(false);

  const { loading, data } = useQuery(DATASET_QUERY);

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
        {loading && (
          <Grid item container justify="center">
            <CircularProgress />
          </Grid>
        )}
        {!loading && data.getDatasets.length && (
          <Grid item container spacing={2} wrap="nowrap">
            <Grid item xs={3}>
              <DatasetList
                datasets={getDatasetModels(data.getDatasets)}
                selectedDataset={selectedDataset}
                onSelect={onDatasetSelect}
              />
            </Grid>
            {selectedDataset && (
              <DatasetDetails datasetModel={{ ...selectedDataset, columns }} />
            )}
          </Grid>
        )}
        {!loading && !data.getDatasets.length && <NoDatasetsHint />}
      </Grid>
      <CreateDatasetDialog
        open={isCreationDialogOpen}
        onClose={handleCreationDialogClose}
      />
    </PageTemplate>
  );
};

export default DataAnalysis;
