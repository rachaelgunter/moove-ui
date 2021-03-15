import { DatasetModel, DatasetStatus } from './types';

interface DatasetDataProps {
  bigQueryDatasetName: string;
  description: string;
  totalRows: number;
  createdAt: string;
  status: DatasetStatus;
}

export const getDatasetModel = (
  data: DatasetDataProps,
  index: number,
): DatasetModel => ({
  id: index,
  name: data.bigQueryDatasetName,
  description: data.description,
  totalRows: data.totalRows,
  createdAt: data.createdAt,
  status: data.status ? data.status : DatasetStatus.ACTIVE, // TODO edit
});

export const getDatasetModels = (data: DatasetDataProps[]): DatasetModel[] =>
  data.map((item: DatasetDataProps, index: number) =>
    getDatasetModel(item, index),
  );
