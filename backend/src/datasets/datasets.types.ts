import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class DatasetParamsInput {
  @Field()
  name: string;

  @Field()
  description?: string;

  @Field()
  projectId: string;

  @Field()
  datasetId: string;

  @Field()
  tableId: string;
}

@ArgsType()
export class ColumnVisualizationParams {
  @Field()
  bucketName: string;

  @Field()
  analysisName: string;

  @Field()
  columnName: string;
}

export interface DatasetListingRequestPayload {
  analysis_project: string;
}

export type DatasetListingResponse = Record<
  string,
  {
    dataset_id: string;
    description: string;
    total_rows: string;
    created_at: string;
    ingest_status: {
      dataset_status: string;
    };
  }
>;

@ObjectType()
export class Dataset {
  @Field()
  analysisName: string;

  @Field()
  bigQueryDatasetName: string;

  @Field()
  description: string;

  @Field()
  totalRows: string;

  @Field()
  createdAt: string;

  @Field()
  status: DatasetStatus;
}

export enum DatasetStatus {
  ACTIVE = 'active',
  PROCESSING = 'processing',
}
