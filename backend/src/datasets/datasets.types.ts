import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { Matches } from 'class-validator';

const ANALYSIS_NAME_VALIDATION_MESSAGE =
  'Name should contain only alphanumeric characters, underscores or dashes';

@InputType()
export class DatasetParamsInput {
  @Field()
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: ANALYSIS_NAME_VALIDATION_MESSAGE,
  })
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
      dataset_status: CloudFunctionDatasetStatus;
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
  FAILED = 'failed',
}

export enum CloudFunctionDatasetStatus {
  ACTIVE = 'finished',
  PROCESSING = 'pending',
  FAILED = 'failed',
}
