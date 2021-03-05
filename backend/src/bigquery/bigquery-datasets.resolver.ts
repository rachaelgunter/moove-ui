import { Logger } from '@nestjs/common';
import { Parent, Context, Args, Resolver, ResolveField } from '@nestjs/graphql';
import {
  BigQueryDataset,
  BigQueryResolverContext,
  BigQueryTable,
} from './bigquery.types';
import { handleGoogleError } from './utils';

@Resolver(() => BigQueryDataset)
export class BigQueryDatasetsResolver {
  private readonly logger = new Logger(BigQueryDatasetsResolver.name);

  @ResolveField(() => [BigQueryTable])
  async tables(
    @Parent() dataset: BigQueryDataset,
    @Context() context: BigQueryResolverContext,
    @Args('includedDatasetsIds', { type: () => [String] })
    datasetsIds: string[],
  ): Promise<BigQueryTable[] | null> {
    try {
      if (datasetsIds.includes(dataset.datasetId)) {
        const { bigQueryClient } = context;
        const tables = await bigQueryClient.getDatasetTables(
          dataset.projectId,
          dataset.datasetId,
        );
        return tables;
      }
      return Promise.resolve(null);
    } catch (e) {
      handleGoogleError(
        this.logger,
        `Unable to get BigQuery tables for dataset: ${dataset.projectId}:${dataset.datasetId}`,
        e,
      );
    }
  }
}
