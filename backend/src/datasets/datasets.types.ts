import { Field, InputType, ObjectType } from '@nestjs/graphql';

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

export interface DatasetListingRequestPayload {
  analysis_project: string;
}

export type DatasetListingResponse = Record<string, string>;

@ObjectType()
export class Dataset {
  @Field()
  analysisName: string;

  @Field()
  bigQueryDatasetName: string;
}
