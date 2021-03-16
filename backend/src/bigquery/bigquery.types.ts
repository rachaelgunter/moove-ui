import { Field, InputType, ObjectType, ArgsType, Int } from '@nestjs/graphql';
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

@ArgsType()
export class BigQueryTableDataParams {
  @Field()
  projectId: string;

  @Field()
  datasetId: string;

  @Field()
  tableId?: string;

  @Field({ defaultValue: '0' })
  offset: string;

  @Field(() => Int, { defaultValue: 5 })
  limit: number;
}

@ArgsType()
export class BigQueryTableInfoParams {
  @Field()
  projectId: string;

  @Field()
  datasetId: string;

  @Field()
  tableId?: string;
}

@ObjectType()
export class BigQueryTableDataCell {
  @Field()
  v?: string | null;
}

@ObjectType()
export class BigQueryTableDataRow {
  @Field(() => [BigQueryTableDataCell], { nullable: 'itemsAndList' })
  f?: BigQueryTableDataCell[];
}

@ObjectType()
export class BigQueryTableData {
  @Field()
  totalRows?: string | null;

  @Field(() => [BigQueryTableDataRow], { nullable: 'itemsAndList' })
  rows?: BigQueryTableDataRow[];
}

@ObjectType()
export class BigQueryTableFieldSchema {
  @Field()
  name?: string;

  @Field()
  type: string;
}

@ObjectType()
export class BigQueryTableSchema {
  @Field(() => [BigQueryTableFieldSchema], { nullable: 'itemsAndList' })
  fields?: BigQueryTableFieldSchema[];
}

@ObjectType()
export class BigQueryTableInfo {
  @Field()
  schema?: BigQueryTableSchema;
}
