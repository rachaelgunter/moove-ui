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

  @Field()
  organizationName: string;

  @Field()
  analysisProject: string;

  @Field()
  assetsBucket: string;

  @Field()
  primaryTimestamp: string;

  @Field({ nullable: true })
  primaryGeography: string;

  @Field()
  groupBy: string;

  @Field(() => [String])
  jenksCols: string[];

  @Field()
  lat: string;

  @Field()
  lon: string;
}

@InputType()
export class FileDatasetParamsInput {
  @Field()
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: ANALYSIS_NAME_VALIDATION_MESSAGE,
  })
  name: string;

  @Field()
  fileName: string;

  @Field()
  description?: string;

  @Field()
  organizationName: string;

  @Field()
  analysisProject: string;

  @Field()
  assetsBucket: string;

  @Field()
  primaryTimestamp: string;

  @Field({ nullable: true })
  primaryGeography: string;

  @Field()
  groupBy: string;

  @Field(() => [String])
  jenksCols: string[];

  @Field()
  lat: string;

  @Field()
  lon: string;
}

@ArgsType()
export class ColumnVisualizationParams {
  @Field()
  bucketName: string;

  @Field()
  analysisName: string;

  @Field()
  columnName: string;

  @Field()
  organizationName: string;
}

@ObjectType()
export class ColumnVisualizations {
  @Field()
  id: string;

  @Field(() => [String])
  analyticsVisualizations: string[];

  @Field(() => [String])
  relationshipsVisualizations: string[];
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
    ingest_status: CloudFunctionDatasetIngestStatus;
  }
>;

export type CloudFunctionDatasetIngestStatus = Record<
  string,
  CloudFunctionDatasetStatus
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

  @Field()
  ingestStatus: string;
}

@ArgsType()
export class FileUploadDatasourceParams {
  @Field()
  fileName: string;

  @Field()
  organizationName: string;

  @Field()
  analysisName: string;
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

@ArgsType()
export class RemovingDatasetParams {
  @Field()
  analysisName: string;

  @Field()
  analysisProject: string;
}

@ObjectType()
export class RemovedDataset {
  @Field()
  analysisName: string;

  @Field()
  analysisProject: string;
}
