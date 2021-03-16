import { Injectable } from '@nestjs/common';
import { BigQueryClient } from './bigquery-client/bigquery-client';
import { UsersService } from 'src/users/users.service';
import { UserTokenPayload } from 'src/users/users.types';
import { BigQueryTableData, BigQueryTableInfo } from './bigquery.types';

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
}
