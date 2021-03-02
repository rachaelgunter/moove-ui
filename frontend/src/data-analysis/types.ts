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
  creationDate: string;
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
