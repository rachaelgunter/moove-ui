import { Logger, UseGuards } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CurrentUser } from 'src/auth/graphql-current-user.decorator';
import { BigQueryService } from './bigquery.service';
import { Role, UserTokenPayload } from 'src/users/users.types';
import { BigQueryTableData, BigQueryTableDataParams } from './bigquery.types';
import { handleGoogleError } from './utils';
import { Roles } from 'src/auth/roles.decorator';

@Resolver(() => BigQueryTableData)
export class BigQueryTableDataResolver {
  private readonly logger = new Logger(BigQueryTableDataResolver.name);
  constructor(private readonly bigQueryService: BigQueryService) {}

  @Roles(Role.PAID_USER, Role.ADMIN)
  @UseGuards(GqlAuthGuard)
  @Query(() => BigQueryTableData)
  async tableData(
    @CurrentUser()
    user: UserTokenPayload,
    @Args() args: BigQueryTableDataParams,
  ): Promise<BigQueryTableData> {
    const { datasetId, projectId, tableId, offset, limit } = args;
    try {
      return await this.bigQueryService.getTableDataList(
        user,
        projectId,
        datasetId,
        tableId,
        offset,
        limit,
      );
    } catch (e) {
      handleGoogleError(
        this.logger,
        `Unable to get BigQuery tables for dataset: ${projectId}:${datasetId}`,
        e,
      );
    }
  }
}
