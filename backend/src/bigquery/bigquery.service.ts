import { Injectable } from '@nestjs/common';
import { BigQueryClient } from './bigquery-client/bigquery-client';
import { UsersService } from 'src/users/users.service';
import { UserTokenPayload } from 'src/users/users.types';
import {
  BigQueryPreviewTable,
  BigQueryTableData,
  BigQueryTableInfo,
  PreviewTableListingResponse,
  BigQueryColumnTable,
} from './bigquery.types';

@Injectable()
export class BigQueryService {
  constructor(private readonly usersService: UsersService) {}

  async getClient(user: UserTokenPayload): Promise<BigQueryClient> {
    const tokens = await this.usersService.getGoogleTokens(user.sub);
    return new BigQueryClient(tokens);
  }

  async getTableDataList(
    user: UserTokenPayload,
    projectId: string,
    datasetId: string,
    tableId: string,
    offset: string,
    limit: number,
  ): Promise<BigQueryTableData> {
    const bigQueryClient = await this.getClient(user);
    return await bigQueryClient.getTableDataList(
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
    const tokens = await this.usersService.getGoogleTokens(user.sub);
    const bigQueryClient = new BigQueryClient(tokens);

    return await bigQueryClient.getTableInfo(projectId, datasetId, tableId);
  }

  async getPreviewTable(
    user: UserTokenPayload,
    projectId: string,
    datasetId: string,
    tableId: string,
    offset: string,
    limit: number,
  ): Promise<BigQueryPreviewTable> {
    const bigQueryClient = await this.getClient(user);
    return await bigQueryClient.getPreviewTable(
      projectId,
      datasetId,
      tableId,
      offset,
      limit,
    );
  }

  async getColumnsTable(
    user: UserTokenPayload,
    projectId: string,
    datasetId: string,
    tableId: string,
    offset: string,
    limit: number,
  ): Promise<BigQueryColumnTable[]> {
    const bigQueryClient = await this.getClient(user);
    return await bigQueryClient
      .getPreviewTable(projectId, datasetId, tableId, offset, limit)
      .then((data) => this.mapColumnsTable(data));
  }

  // TODO refactor
  mapColumnsTable(data: PreviewTableListingResponse) {
    const markers = { min: '_MIN', max: '_MAX' };

    const res = [];
    let column = {} as BigQueryColumnTable;

    data.headers.forEach((header, index) => {
      if (header.name.endsWith(markers.min)) {
        column.name = header.name.replace(markers.min, '');
        column.type = header.type;
        column.min = data.rows[0][index];
      }

      if (header.name.endsWith(markers.max)) {
        column.max = data.rows[0][index];
      }

      if (column.name && column.type && column.min && column.max) {
        res.push(column);
        column = {} as BigQueryColumnTable;
      }
    });

    return res;
  }
}
