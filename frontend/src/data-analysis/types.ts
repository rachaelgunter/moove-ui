// eslint-disable-next-line import/prefer-default-export
export enum DatasetStatus {
  ACTIVE,
  PROCESSING,
}

export type DatasetModel = {
  id: number;
  name: string;
  description: string;
  status: DatasetStatus;
  totalRows: number;
  createdAt: string;
  columns?: ColumnModel[];
};

export type ColumnModel = {
  [key: string]: string | number;
  name: string;
  type: string;
  populated: number;
  min: string | number;
  max: string | number;
};

export type BigQueryProjectsResponse = {
  getUsersProjects: BigQueryProject[];
};

export type BigQueryProject = {
  projectId: string;
  datasets: BigQueryDataset[];
};

export type BigQueryDataset = {
  datasetId: string;
  tables: BigQueryTable[];
};

export type BigQueryTable = {
  tableId: string;
};

export type TableIdentity = {
  projectId: string;
  datasetId: string;
  tableId: string;
};
