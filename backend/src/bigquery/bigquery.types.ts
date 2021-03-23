import { Field, InputType, ObjectType, ArgsType, Int } from '@nestjs/graphql';
import { BigqueryClientService } from './bigquery-client/bigquery-client.service';

export interface BigQueryResolverContext {
  bigQueryClient: BigqueryClientService;
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

  @Field(() => Int, { defaultValue: 0 })
  offset: number;

  @Field(() => Int, { defaultValue: 5 })
  limit: number;

  @Field(() => [String], { nullable: 'itemsAndList' })
  selectedFields?: string[];
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

@ObjectType()
export class BigQueryPreviewHeaders {
  @Field()
  name: string;

  @Field()
  type: string;
}

@ObjectType()
export class BigQueryTableMetadata {
  @Field()
  totalRows?: number;
}

@ObjectType()
export class BigQueryPreviewTable {
  @Field(() => [BigQueryPreviewHeaders], { nullable: 'itemsAndList' })
  headers?: BigQueryPreviewHeaders[];

  @Field(() => [[String]], { nullable: 'itemsAndList' })
  rows?: string[][];

  @Field({ nullable: true })
  tableMetadata?: BigQueryTableMetadata;
}

@ObjectType()
export class BigQueryColumnTable {
  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  min: string;

  @Field()
  max: string;

  @Field()
  populated: number;

  @Field({ nullable: true })
  average?: number;

  @Field({ nullable: true })
  standardDeviation?: number;

  @Field({ nullable: true })
  sum?: number;

  @Field({ nullable: true })
  variance?: number;

  @Field({ nullable: true })
  count?: number;
}
