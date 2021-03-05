import { Logger, UseGuards } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CurrentUser } from 'src/auth/graphql-current-user.decorator';
import { UsersService } from 'src/users/users.service';
import { UserTokenPayload } from 'src/users/users.types';
import { BigQueryClient } from './bigquery-client/bigquery-client';
import { BigQueryTable, BigQueryTablesParams } from './bigquery.types';
import { handleGoogleError } from './utils';

@Resolver(() => BigQueryTable)
export class BigQueryTablesResolver {
  private readonly logger = new Logger(BigQueryTablesResolver.name);
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(new GqlAuthGuard())
  @Query(() => [BigQueryTable])
  async tables(
    @CurrentUser()
    user: UserTokenPayload,
    @Args('tablesParams', { type: () => BigQueryTablesParams })
    tablesParams: BigQueryTablesParams,
  ): Promise<BigQueryTable[]> {
    const { datasetId, projectId } = tablesParams;

    try {
      const tokens = await this.usersService.getGoogleTokens(user.sub);
      const bigQueryClient = new BigQueryClient(tokens);
      const tables = await bigQueryClient.getDatasetTables(
        projectId,
        datasetId,
      );

      return tables;
    } catch (e) {
      handleGoogleError(
        this.logger,
        `Unable to get BigQuery tables for dataset: ${projectId}:${datasetId}`,
        e,
      );
    }
  }
}
