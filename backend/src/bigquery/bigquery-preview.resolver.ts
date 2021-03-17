import { Logger, UseGuards } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CurrentUser } from 'src/auth/graphql-current-user.decorator';
import { BigQueryService } from './bigquery.service';
import { UserTokenPayload } from 'src/users/users.types';
import {
  BigQueryPreviewTable,
  BigQueryTableDataParams,
  BigQueryColumnTable,
} from './bigquery.types';
import { handleGoogleError } from './utils';

@Resolver(() => BigQueryPreviewTable)
export class BigQueryPreviewResolver {
  private readonly logger = new Logger(BigQueryPreviewResolver.name);
  constructor(private readonly bigQueryService: BigQueryService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => BigQueryPreviewTable)
  async previewTable(
    @CurrentUser()
    user: UserTokenPayload,
    @Args() args: BigQueryTableDataParams,
  ): Promise<BigQueryPreviewTable> {
    const { datasetId, projectId, tableId, offset, limit } = args;
    try {
      return await this.bigQueryService.getPreviewTable(
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

  @UseGuards(GqlAuthGuard)
  @Query(() => [BigQueryColumnTable], { nullable: 'itemsAndList' })
  async columnsTable(
    @CurrentUser()
    user: UserTokenPayload,
    @Args() args: BigQueryTableDataParams,
  ): Promise<BigQueryColumnTable[]> {
    const { datasetId, projectId, tableId, offset, limit } = args;
    try {
      return await this.bigQueryService.getColumnsTable(
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
