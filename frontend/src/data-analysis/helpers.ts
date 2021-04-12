import { DatasetModel, DatasetStatus } from './types';

export interface DatasetDataProps {
  bigQueryDatasetName: string;
  analysisName: string;
  description: string;
  totalRows: number;
  createdAt: string;
  status: DatasetStatus;
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
  };
};

export const getDatasetModels = (data: DatasetDataProps[]): DatasetModel[] =>
  data.map((item: DatasetDataProps, index: number) =>
    getDatasetModel(item, index),
  );
