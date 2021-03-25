import { Logger, UseGuards } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CurrentUser } from 'src/auth/graphql-current-user.decorator';
import { Role, UserTokenPayload } from 'src/users/users.types';
import { BigqueryClientService } from './bigquery-client/bigquery-client.service';
import { BigQueryTable, BigQueryTablesParams } from './bigquery.types';
import { handleGoogleError } from './utils';
import { Roles } from 'src/auth/roles.decorator';

@Resolver(() => BigQueryTable)
export class BigQueryTablesResolver {
  private readonly logger = new Logger(BigQueryTablesResolver.name);
  constructor(private readonly bigqueryClientService: BigqueryClientService) {}

  @Roles(Role.PAID_USER, Role.ADMIN)
  @UseGuards(GqlAuthGuard)
  @Query(() => [BigQueryTable], { nullable: 'itemsAndList' })
  async tables(
    @CurrentUser()
    user: UserTokenPayload,
    @Args('tablesParams', { type: () => BigQueryTablesParams })
    tablesParams: BigQueryTablesParams,
  ): Promise<BigQueryTable[]> {
    const { datasetId, projectId } = tablesParams;

    try {
      const tables = await this.bigqueryClientService.getDatasetTables(
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
