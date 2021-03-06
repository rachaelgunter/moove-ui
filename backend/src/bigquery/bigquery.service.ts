import { HttpService, Injectable, Logger } from '@nestjs/common';

import { BigqueryClientService } from './bigquery-client/bigquery-client.service';
import { UserTokenPayload } from 'src/users/users.types';
import {
  BigQueryPreviewTable,
  BigQueryTableData,
  BigQueryTableInfo,
  BigQueryColumnTable,
  PreviewSegment,
  StreetViewCoordinates,
  BigQueryPreviewSegmentStatistics,
  BigQuerySegment,
  SegmentStatisticsFields,
  BigQueryPreviewHeaders,
} from './bigquery.types';
import { ConfigService } from '@nestjs/config';
import { SegmentNotFound } from 'src/errors';
const GOOGLE_ROADS_API_URL = 'https://roads.googleapis.com/v1/snapToRoads';

@Injectable()
export class BigQueryService {
  private readonly logger = new Logger(BigQueryService.name);

  constructor(
    private readonly bigqueryClientService: BigqueryClientService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getTableDataList(
    user: UserTokenPayload,
    projectId: string,
    datasetId: string,
    tableId: string,
    offset: number,
    limit: number,
  ): Promise<BigQueryTableData> {
    return await this.bigqueryClientService.getTableDataList(
      projectId,
      datasetId,
      tableId,
      offset,
      limit,
    );
  }

  async getTableInfo(
    user: UserTokenPayload,
    projectId: string,
    datasetId: string,
    tableId: string,
  ): Promise<BigQueryTableInfo> {
    return await this.bigqueryClientService.getTableInfo(
      projectId,
      datasetId,
      tableId,
    );
  }

  async getPreviewTable(
    user: UserTokenPayload,
    projectId: string,
    datasetId: string,
    tableId: string,
    offset: number,
    limit: number,
    selectedFields?: string[],
  ): Promise<BigQueryPreviewTable> {
    return await this.bigqueryClientService.getPreviewTable(
      projectId,
      datasetId,
      tableId,
      offset,
      limit,
      selectedFields,
    );
  }

  async getColumnsTable(
    user: UserTokenPayload,
    projectId: string,
    datasetId: string,
    tableId: string,
    offset: number,
    limit: number,
  ): Promise<BigQueryColumnTable[]> {
    const columnsData = await this.bigqueryClientService.getPreviewTable(
      projectId,
      datasetId,
      tableId,
      offset,
      limit,
    );

    return this.mapColumnsTable(columnsData);
  }

  mapColumnsTable(data: BigQueryPreviewTable) {
    const markers = {
      min: '_MIN',
      max: '_MAX',
      average: '_AVG',
      count: '_COUNT',
      standardDeviation: '_STDDEV',
      sum: '_SUM',
      variance: '_VARIANCE',
    };

    const res: BigQueryColumnTable[] = [];
    let column = {} as BigQueryColumnTable;
    let totalRowsCount: number;

    data.headers.forEach((header, index) => {
      if (header.name === 'total_count') {
        totalRowsCount = +data.rows[0][index];
        return;
      }
      Object.keys(markers).forEach((key) => {
        if (header.name.endsWith(markers[key])) {
          column[key] = data.rows[0][index];

          if (markers[key] === markers.min) {
            column.name = header.name.replace(markers.min, '');
            column.type = header.type;
          }
        }
      });
      if (Object.keys(markers).every((marker) => column[marker])) {
        res.push(column);
        column = {} as BigQueryColumnTable;
      }
    });

    return res.map((column) => ({
      ...column,
      populated: this.getColumnPopulatedValue(totalRowsCount, column.count),
    }));
  }

  getColumnPopulatedValue(totalRowsCount: number, rowsCount: number): number {
    const percentage = (rowsCount / totalRowsCount) * 100;

    if (Number.isNaN(percentage)) {
      return 100;
    }

    return Math.round((percentage + Number.EPSILON) * 100) / 100;
  }

  async getPreviewSegment(segmentId: string): Promise<PreviewSegment> {
    const segments = await this.bigqueryClientService.getPreviewSegment(
      segmentId,
    );

    if (segments.length === 0) {
      throw new SegmentNotFound();
    }

    const streetViewCoordinates = await this.snapSegmentToRoad(segments[0]);
    return {
      rawData: JSON.stringify(segments),
      statistics: this.getSegmentStatistics(segments[0]),
      streetViewCoordinates,
    };
  }

  async snapSegmentToRoad(
    segment: BigQuerySegment,
  ): Promise<StreetViewCoordinates> {
    const segmentgeojson = JSON.parse(segment.geometry_geojson);
    const [startLon, startLat] = segmentgeojson.coordinates[0];
    const [endLon, endLat] = segmentgeojson.coordinates[1];

    return this.httpService
      .get(GOOGLE_ROADS_API_URL, {
        params: {
          interpolate: true,
          key: this.configService.get('GOOGLE_ROADS_API_KEY'),
          path: `${startLat},${startLon}|${endLat},${endLon}`,
        },
      })
      .toPromise()
      .then((response) => response.data.snappedPoints[0]?.location);
  }

  getSegmentStatistics(
    segment: BigQuerySegment,
  ): BigQueryPreviewSegmentStatistics[] {
    const fields = Object.keys(SegmentStatisticsFields);

    return fields.map((field) => {
      return { name: field, value: segment && segment[field] };
    });
  }

  async getColumnsData(
    projectId: string,
    datasetId: string,
    tableId: string,
  ): Promise<BigQueryPreviewHeaders[]> {
    /**
     * We have to request one row because by default
     * BigQuery Google API tries to return all rows at once
     * even if 0 limit is passed
     */
    const columnsData = await this.bigqueryClientService.getPreviewTable(
      projectId,
      datasetId,
      tableId,
      0,
      1,
    );

    return columnsData.headers;
  }
}
