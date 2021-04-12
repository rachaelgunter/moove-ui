/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const CREATE_DATASET_MUTATION = gql`
  mutation CreateDataset($datasetParams: DatasetParamsInput!) {
    createDataset(datasetParams: $datasetParams)
  }
`;

export const DELETE_DATASET_MUTATION = gql`
  mutation DeleteDataset($GCPProjectName: String!, $datasetId: String!) {
    deleteDataset(GCPProjectName: $GCPProjectName, datasetId: $datasetId) {
      GCPProjectName
      datasetId
    }
  }
`;
