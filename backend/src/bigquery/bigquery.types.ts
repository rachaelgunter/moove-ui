import { Field, InputType, ObjectType, ArgsType } from '@nestjs/graphql';
import { OffsetPaginationParams } from 'src/shared/types';
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
export class BigQueryTableDataParams extends OffsetPaginationParams {
  @Field()
  projectId: string;

  @Field()
  datasetId: string;

  @Field()
  tableId?: string;

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
export class BigQueryPreviewGroupedCell {
  @Field()
  id?: string;

  @Field({ nullable: true })
  cell?: string;
}

@ObjectType()
export class BigQueryPreviewGroupedRow {
  @Field()
  id: string;

  @Field(() => [BigQueryPreviewGroupedCell], { nullable: 'itemsAndList' })
  row: BigQueryPreviewGroupedCell[];
}

@ObjectType()
export class BigQueryPreviewGroupedRows {
  @Field()
  id: string;

  @Field(() => [BigQueryPreviewGroupedRow], { nullable: 'itemsAndList' })
  rows: BigQueryPreviewGroupedRow[];
}

@ObjectType()
export class BigQueryPreviewTable {
  @Field(() => [BigQueryPreviewHeaders], { nullable: 'itemsAndList' })
  headers?: BigQueryPreviewHeaders[];

  @Field(() => [BigQueryPreviewGroupedRows], { nullable: 'itemsAndList' })
  groupedRows?: BigQueryPreviewGroupedRows[];

  @Field(() => [[String]], { nullable: 'itemsAndList' })
  rows?: string[][];

  @Field({ nullable: true })
  tableMetadata?: BigQueryTableMetadata;
}

@ArgsType()
export class BigQueryPreviewSegmentParams {
  @Field()
  segmentId: string;
}

@ObjectType()
export class BigQueryPreviewSegmentStatistics {
  @Field()
  name: string;

  @Field({ nullable: true })
  value?: string;
}

@ObjectType()
export class StreetViewCoordinates {
  @Field()
  latitude: number;

  @Field()
  longitude: number;
}

@ObjectType()
export class PreviewSegment {
  @Field()
  rawData: string;

  @Field(() => [BigQueryPreviewSegmentStatistics], { nullable: 'itemsAndList' })
  statistics: BigQueryPreviewSegmentStatistics[];

  @Field(() => StreetViewCoordinates)
  streetViewCoordinates: StreetViewCoordinates;
}

export enum SegmentStatisticsFields {
  max_slope = 'max_slope',
  slope = 'slope',
  slope_boosted_wt_avg = 'slope_boosted_wt_avg',
  slope_boosted_wt_avg_0_1 = 'slope_boosted_wt_avg_0_1',
  slope_wt_avg = 'slope_wt_avg',
  slope_wt_avg_0_1 = 'slope_wt_avg_0_1',
  slopes_bumpiness_nobc = 'slopes_bumpiness_nobc',
  slopes_bumpiness = 'slopes_bumpiness',
}

export type BigQuerySegment = {
  [key in SegmentStatisticsFields]: string;
} & { geometry_geojson: string };

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
