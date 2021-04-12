import React, { useContext, useState } from 'react';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import PageTemplate from 'src/shared/PageTemplate';
import { DatasetModel } from 'src/data-analysis/types';
import { UserContext } from 'src/auth/UserProvider';
import AddDatasetButton from '../shared/CreateButton';
import DatasetList from './DatasetList';
import DatasetDetails from './DatasetDetails';
import CreateDatasetDialog from './CreateDatasetDialog/CreateDatasetDialog';
import { DATASET_QUERY } from './queries';
import { getDatasetModels } from './helpers';
import { NoDatasetsHint } from './hints';

const DELAY_TO_FETCH_DATASETS = 5_000;

const DataAnalysis: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<DatasetModel | null>(
    null,
  );

  const [isCreationDialogOpen, setIsCreationDialogOpen] = useState(false);

  const user = useContext(UserContext);

  const { loading, data, refetch } = useQuery(DATASET_QUERY, {
    variables: {
      GCPProjectName: user.GCPProjectName,
    },
  });

  const onAddDatasetClick = () => {
    setIsCreationDialogOpen(true);
  };

  const handleCreationDialogClose = () => {
    setIsCreationDialogOpen(false);
  };

  const onDatasetSelect = (dataset: DatasetModel) => {
    setSelectedDataset(dataset);
  };

  const onDatasetCreated = async () => {
    setTimeout(async () => {
      await refetch();
    }, DELAY_TO_FETCH_DATASETS);
  };

  return (
    <PageTemplate title="Data analysis">
      <Grid container direction="column" spacing={2}>
        <Grid item container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="subtitle1">Datasets</Typography>
          </Grid>
          <Grid item>
            <AddDatasetButton onClick={onAddDatasetClick}>
              New Dataset
            </AddDatasetButton>
          </Grid>
        </Grid>
        {loading && (
          <Grid item container justify="center">
            <CircularProgress />
          </Grid>
        )}
        {!loading && !!data.getDatasets.length && (
          <Grid item container spacing={2} wrap="nowrap">
            <Grid item xs={3}>
              <DatasetList
                datasets={getDatasetModels(data.getDatasets)}
                selectedDataset={selectedDataset}
                onSelect={onDatasetSelect}
              />
            </Grid>
            {selectedDataset && (
              <DatasetDetails
                datasetModel={selectedDataset}
                resetDatasetModel={() => setSelectedDataset(null)}
              />
            )}
          </Grid>
        )}
        {!loading && !data.getDatasets.length && <NoDatasetsHint />}
      </Grid>
      <CreateDatasetDialog
        open={isCreationDialogOpen}
        onClose={handleCreationDialogClose}
        onComplete={onDatasetCreated}
      />
    </PageTemplate>
  );
};

export default DataAnalysis;
