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
    tableData(
      projectId: $projectId
      datasetId: $datasetId
      tableId: $tableId
      selectedFields: $selectedFields
      limit: $limit
    ) {
      totalRows
      rows {
        f {
          v
        }
      }
    }
  }
`;

export const KEPLER_STRUCTURE_QUERY = gql`
  query TableInfo(
    $projectId: String!
    $datasetId: String!
    $tableId: String!
    $selectedFields: [String]
  ) {
    tableInfo(
      projectId: $projectId
      datasetId: $datasetId
      tableId: $tableId
      selectedFields: $selectedFields
    ) {
      schema {
        fields {
          name
          type
        }
      }
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
