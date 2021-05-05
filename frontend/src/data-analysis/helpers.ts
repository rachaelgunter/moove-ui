import { DatasetModel, DatasetStatus, DatasetIngestStatusModel } from './types';

export interface DatasetDataProps {
  bigQueryDatasetName: string;
  analysisName: string;
  description: string;
  totalRows: number;
  createdAt: string;
  status: DatasetStatus;
  ingestStatus: DatasetIngestStatusModel;
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
    ingestStatus: data.ingestStatus,
  };
};

export const getDatasetModels = (data: DatasetDataProps[]): DatasetModel[] =>
  data.map((item: DatasetDataProps, index: number) =>
    getDatasetModel(item, index),
  );
