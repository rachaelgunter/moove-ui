import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BigQueryClient } from './bigquery-client/bigquery-client';

export interface BigQueryResolverContext {
  bigQueryClient: BigQueryClient;
}

@ObjectType()
export class BigQueryTable {
  @Field()
  datasetId: string;

  @Field()
  tableId: string;
}

@ObjectType()
export class BigQueryDataset {
  @Field()
  projectId: string;

  @Field()
  datasetId: string;

  @Field(() => [BigQueryTable], { nullable: 'itemsAndList' })
  tables?: BigQueryTable[];
}

@ObjectType()
export class BigQueryProject {
  @Field()
  projectId: string;

  @Field()
  numericId: string;

  @Field()
  friendlyName: string;

  @Field(() => [BigQueryDataset], { nullable: 'itemsAndList' })
  datasets?: BigQueryDataset[];
}

@InputType()
export class BigQueryTablesParams {
  @Field()
  projectId: string;

  @Field()
  datasetId: string;
}
