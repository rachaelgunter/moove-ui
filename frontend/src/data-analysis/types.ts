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
};
