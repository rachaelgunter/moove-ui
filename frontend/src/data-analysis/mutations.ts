/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const CREATE_DATASET_MUTATION = gql`
  mutation CreateDataset($datasetParams: DatasetParamsInput!) {
    createDataset(datasetParams: $datasetParams)
  }
`;
