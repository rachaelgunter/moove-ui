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
  query ColumnsTable {
    columnsTable(
      projectId: "moove-platform-testing-data"
      datasetId: "denver_friction5_galileo_analysis"
      tableId: "denver_friction5_general_stats"
    ) {
      min
      max
      name
      type
    }
  }
`;
