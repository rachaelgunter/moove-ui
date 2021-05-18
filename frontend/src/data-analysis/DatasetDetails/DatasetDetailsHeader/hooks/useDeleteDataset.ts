import { useMutation, StoreObject, MutationTuple } from '@apollo/client';
import { DELETE_DATASET_MUTATION } from 'src/data-analysis/mutations';
import { DatasetRemovalResponse } from 'src/data-analysis/types';

type DeleteDatasetParams = {
  analysisName: string;
  analysisProject?: string;
};

const useDeleteDataset = (): MutationTuple<
  DatasetRemovalResponse,
  DeleteDatasetParams
> =>
  useMutation<DatasetRemovalResponse, DeleteDatasetParams>(
    DELETE_DATASET_MUTATION,
    {
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const { analysisName } = data.deleteDataset;

        cache.modify({
          id: cache.identify({ __typename: 'Query' }),
          fields: {
            getDatasets(existingDatasets, { readField }) {
              return existingDatasets.filter(
                (datasetRef: StoreObject) =>
                  analysisName !== readField('analysisName', datasetRef),
              );
            },
          },
        });
      },
    },
  );

export default useDeleteDataset;
