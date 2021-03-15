import { Logger, UseGuards } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CurrentUser } from 'src/auth/graphql-current-user.decorator';
import { BigQueryService } from './bigquery.service';
import { UserTokenPayload } from 'src/users/users.types';
import { BigQueryTableInfo, BigQueryTableInfoParams } from './bigquery.types';
import { handleGoogleError } from './utils';

@Resolver(() => BigQueryTableInfo)
export class BigQueryTableInfoResolver {
  private readonly logger = new Logger(BigQueryTableInfoResolver.name);
  constructor(private readonly bigQueryService: BigQueryService) {}

  @UseGuards(new GqlAuthGuard())
  @Query(() => BigQueryTableInfo)
  async tableInfo(
    @CurrentUser()
    user: UserTokenPayload,
    @Args() args: BigQueryTableInfoParams,
  ): Promise<BigQueryTableInfo> {
    const { datasetId, projectId, tableId } = args;
    try {
      return await this.bigQueryService.getTableInfo(
        user,
        projectId,
        datasetId,
        tableId,
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
