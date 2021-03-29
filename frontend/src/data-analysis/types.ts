export enum DatasetStatus {
  ACTIVE = 'active',
  PROCESSING = 'processing',
  FAILED = 'failed',
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
  average: number;
  standardDeviation: number;
  variance: number;
  count: number;
  sum: number;
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

export type KeplerDataQueryResponse = {
  previewTable: {
    headers: { name: string }[];
    rows: unknown[];
  };
};

export type KeplerDataset = {
  info: {
    label: string;
    id: string;
  };
  data: {
    fields: {
      name: string;
    }[];
    rows: unknown[];
  };
};

export enum ColumnVisualizationSubFolder {
  JOINT_PLOTS = 'joint_plots',
}

export type PreviewSegmentModelStatistic = {
  name: string;
  value: string;
};

export type PreviewSegmentModel = {
  statistics?: PreviewSegmentModelStatistic[];
  rawData?: string;
};
