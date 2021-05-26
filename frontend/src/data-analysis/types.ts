import { ApolloError } from '@apollo/client';

export enum DatasetStatus {
  ACTIVE = 'active',
  PROCESSING = 'processing',
  FAILED = 'failed',
}

export enum DatasetIngestStatus {
  ACTIVE = 'finished',
  PROCESSING = 'pending',
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
  ingestStatus: DatasetIngestStatusModel[];
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

export type DatasetIngestStatusModel = {
  ingestionStep: string;
  status: DatasetIngestStatus;
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
    headers: ColumnData[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: any;
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
  streetViewCoordinates?: {
    latitude: number;
    longitude: number;
  };
};

export type Segment = {
  previewSegment: PreviewSegmentModel;
};

export type SegmentData = {
  data: Segment | undefined;
  error?: ApolloError | undefined;
  loading: boolean;
};

export type ColumnData = {
  name: string;
  type: ColumnType;
};

export enum ColumnType {
  TIMESTAMP = 'TIMESTAMP',
  FLOAT = 'FLOAT',
  GEOGRAPHY = 'GEOGRAPHY',
  INTEGER = 'INTEGER',
}

export type RemovedDataset = {
  analysisName: string;
  analysisProject: string;
};

export type DatasetRemovalResponse = {
  deleteDataset: RemovedDataset;
};
