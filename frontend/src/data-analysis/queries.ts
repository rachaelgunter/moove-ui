import { gql } from '@apollo/client';

export const BIG_QUERY_PROJECTS_QUERY = gql`
  query Projects {
    getUsersProjects {
      projectId
      datasets {
        datasetId
      }
    }
  }
`;

export const BIG_QUERY_TABLES_QUERY = gql`
  query Tables($tablesParams: BigQueryTablesParams!) {
    tables(tablesParams: $tablesParams) {
      tableId
      datasetId
    }
  }
`;

export const KEPLER_DATA_QUERY = gql`
  query TableData(
    $projectId: String!
    $datasetId: String!
    $tableId: String!
    $selectedFields: [String]
    $limit: Int
  ) {
    previewTable(
      projectId: $projectId
      datasetId: $datasetId
      tableId: $tableId
      selectedFields: $selectedFields
      limit: $limit
    ) {
      headers {
        name
      }
      rows
    }
  }
`;

export const DATASET_QUERY = gql`
  query getDatasets {
    getDatasets {
      analysisName
      bigQueryDatasetName
      description
      totalRows
      createdAt
      status
    }
  }
`;

export const DATASET_COLUMNS_QUERY = gql`
  query ColumnsTable(
    $projectId: String!
    $datasetId: String!
    $tableId: String!
  ) {
    columnsTable(
      projectId: $projectId
      datasetId: $datasetId
      tableId: $tableId
    ) {
      min
      max
      name
      type
      populated
      average
      standardDeviation
      variance
      count
      sum
    }
  }
`;
