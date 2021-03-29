import { Injectable, Logger } from '@nestjs/common';

import { BigqueryClientService } from './bigquery-client/bigquery-client.service';
import { UsersService } from 'src/users/users.service';
import { UserTokenPayload } from 'src/users/users.types';
import {
  BigQueryPreviewTable,
  BigQueryTableData,
  BigQueryTableInfo,
  BigQueryColumnTable,
  BigQueryPreviewSegment,
} from './bigquery.types';

@Injectable()
export class BigQueryService {
  private readonly logger = new Logger(BigQueryService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly bigqueryClientService: BigqueryClientService,
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
    /**
     * Replace here is a dirty hack since we don't know the analysis name on the backend
     * TODO: move tables names composing from FE to BE, so that we pass only analysis name as a query param
     *  */
    const analysisName = datasetId.replace('galileo_analysis', 'null_counts');
    let emptyColumnsData: BigQueryPreviewTable | null = null;
    try {
      emptyColumnsData = await this.bigqueryClientService.getPreviewTable(
        projectId,
        datasetId,
        analysisName,
        offset,
        limit,
      );
    } catch (e) {
      this.logger.log(
        `Null counts table for dataset ${analysisName} is not present`,
      );
    }

    return this.mapColumnsTable(columnsData, emptyColumnsData);
  }

  mapColumnsTable(
    data: BigQueryPreviewTable,
    emptyColumnsData: BigQueryPreviewTable | null,
  ) {
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

    data.headers.forEach((header, index) => {
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
      populated: emptyColumnsData
        ? this.getColumnPopulatedValue(
            column.name,
            data.tableMetadata.totalRows,
            emptyColumnsData,
          )
        : 100,
    }));
  }

  getColumnPopulatedValue(
    columnName: string,
    totalRows: number,
    emptyColumnsData: BigQueryPreviewTable,
  ): number {
    const rowIndex = emptyColumnsData.rows.findIndex(
      ([name]) => name === columnName,
    );
    const percentage =
      (1 - +emptyColumnsData.rows[rowIndex]?.[1] / totalRows) * 100;

    if (Number.isNaN(percentage)) {
      return 100;
    }

    return Math.round((percentage + Number.EPSILON) * 100) / 100;
  }

  async getPreviewSegment(segmentId: string): Promise<BigQueryPreviewSegment> {
    return await this.bigqueryClientService.getPreviewSegment(segmentId);
  }
}
