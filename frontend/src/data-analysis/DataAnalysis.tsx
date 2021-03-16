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
        {!loading ? (
          <Grid item container spacing={2}>
            <Grid item xs={3}>
              <DatasetList
                datasets={getDatasetModels(data.getDatasets)}
                selectedDataset={selectedDataset}
                onSelect={onDatasetSelect}
              />
            </Grid>
            {selectedDataset && (
              <Grid item xs={9}>
                <DatasetDetails datasetModel={selectedDataset} />
              </Grid>
            )}
          </Grid>
        ) : (
          <Grid item container justify="center">
            <CircularProgress />
          </Grid>
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
