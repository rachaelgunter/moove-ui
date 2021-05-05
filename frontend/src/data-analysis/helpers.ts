import { DatasetModel, DatasetStatus } from './types';

export interface DatasetDataProps {
  bigQueryDatasetName: string;
  analysisName: string;
  description: string;
  totalRows: number;
  createdAt: string;
  status: DatasetStatus;
  ingestStatus: string;
}

export const getDatasetModel = (
  data: DatasetDataProps,
  index: number,
): DatasetModel => {
  return {
    id: index,
    name: data.analysisName,
    description: data.description,
    totalRows: data.totalRows,
    createdAt: data.createdAt,
    status: data.status,
    ingestStatus: mapIngestStatus(data.ingestStatus),
  };
};

export const getDatasetModels = (data: DatasetDataProps[]): DatasetModel[] =>
  data.map((item: DatasetDataProps, index: number) =>
    getDatasetModel(item, index),
  );

const mapIngestStatus = (ingestStatusData: string) => {
  const ingestStatus = JSON.parse(ingestStatusData);

  return Object.keys(ingestStatus).map((key) => ({
    ingestionStep: key.replaceAll('_', ' '),
    status: ingestStatus[key],
  }));
};
