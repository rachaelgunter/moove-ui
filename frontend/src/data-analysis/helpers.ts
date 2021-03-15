import { DatasetModel } from './types';

interface DatasetDataProps {
  bigQueryDatasetName: string;
  description: string;
  totalRows: number;
  createdAt: string;
  [key: string]: any; // TODO remove
}

export const getDatasetModel = (
  data: DatasetDataProps,
  index: number,
): DatasetModel => ({
  id: data.id ? data.id : index,
  name: data.bigQueryDatasetName,
  description: data.description,
  totalRows: data.totalRows,
  createdAt: data.createdAt,
  status: data.status ? data.status : '',
  columns: data.columns,
});

export const getDatasetModels = (data: DatasetDataProps[]): DatasetModel[] =>
  data.map((item: DatasetDataProps, index: number) =>
    getDatasetModel(item, index),
  );
