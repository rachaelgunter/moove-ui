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

export const DATASET_COLUMN_VISUALIZATIONS_QUERY = gql`
  query datasetsVisualizations(
    $bucketName: String!
    $analysisName: String!
    $columnName: String!
  ) {
    datasetColumnVisualizations(
      bucketName: $bucketName
      analysisName: $analysisName
      columnName: $columnName
    )
  }
`;

export const DATASET_COLUMN_VISUALIZATIONS_OF_JOINT_PLOTS_QUERY = gql`
  query datasetColumnVisualizations(
    $bucketName: String!
    $analysisName: String!
    $columnName: String!
    $subFolder: String!
  ) {
    datasetColumnVisualizations(
      bucketName: $bucketName
      analysisName: $analysisName
      columnName: $columnName
      subFolder: $subFolder
    )
  }
`;

export const BIG_QUERY_PREVIEW_TABLE_QUERY = gql`
  query getPreviewTable(
    $projectId: String!
    $datasetId: String!
    $tableId: String!
    $offset: Int!
    $limit: Int!
  ) {
    previewTable(
      projectId: $projectId
      datasetId: $datasetId
      tableId: $tableId
      offset: $offset
      limit: $limit
    ) {
      tableMetadata {
        totalRows
      }
      headers {
        name
      }
      rows
    }
  }
`;
