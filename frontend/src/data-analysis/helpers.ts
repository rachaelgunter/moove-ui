import { DatasetModel } from './types';

interface DatasetDataProps {
  bigQueryDatasetName: string;
  [key: string]: any; // TODO remove
}

export const getDatasetModel = (
  data: DatasetDataProps,
  index: number,
): DatasetModel => ({
  id: data.id ? data.id : index,
  name: data.bigQueryDatasetName ? data.bigQueryDatasetName : '',
  description: data.description ? data.description : '',
  status: data.status ? data.status : '',
  totalRows: data.totalRows ? data.totalRows : 0,
  creationDate: data.creationDate ? data.creationDate : '-',
  columns: data.columns ? data.columns : [],
});

export const getDatasetModels = (data: DatasetDataProps[]): DatasetModel[] =>
  data.map((item: DatasetDataProps, index: number) =>
    getDatasetModel(item, index),
  );
