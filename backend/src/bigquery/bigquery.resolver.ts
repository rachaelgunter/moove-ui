import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Parent,
  Context,
  Args,
  ResolveProperty,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CurrentUser } from 'src/auth/graphql-current-user.decorator';
import { UsersService } from 'src/users/users.service';
import { UserTokenPayload } from 'src/users/users.types';
import { BigQueryClient } from './bigquery-client/bigquery-client';
import {
  BigQueryDataset,
  BigQueryProject,
  BigQueryTable,
} from './bigquery.types';

interface BigQueryResolverContext {
  bigQueryClient: BigQueryClient;
}

@Resolver(() => BigQueryProject)
export class BigqueryResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [BigQueryProject])
  async getUsersProjects(
    @CurrentUser() user: UserTokenPayload,
    @Context() context: BigQueryResolverContext,
  ): Promise<BigQueryProject[]> {
    try {
      const tokens = await this.usersService.getGoogleTokens(user.sub);
      const bigQueryClient = new BigQueryClient(tokens);
      context.bigQueryClient = bigQueryClient;
      return bigQueryClient.getProjects();
    } catch (e) {
      throw new NotFoundException(`No projects for user with id: ${user.sub}`);
    }
  }

  @ResolveProperty(() => [BigQueryDataset])
  async datasets(
    @Parent() project: BigQueryProject,
    @Context() context: BigQueryResolverContext,
  ): Promise<BigQueryDataset[]> {
    const { bigQueryClient } = context;
    return bigQueryClient.getProjectDatasets(project.projectId);
  }
}

@Resolver(() => BigQueryDataset)
export class BigQueryDatasetResolver {
  @ResolveProperty(() => [BigQueryTable])
  async tables(
    @Parent() dataset: BigQueryDataset,
    @Context() context: BigQueryResolverContext,
    @Args('includedDatasetsIds', { type: () => [String] })
    datasetsIds: string[],
  ): Promise<BigQueryTable[] | null> {
    if (datasetsIds.includes(dataset.datasetId)) {
      const { bigQueryClient } = context;
      return bigQueryClient.getDatasetTables(
        dataset.projectId,
        dataset.datasetId,
      );
    }
    return Promise.resolve(null);
  }
}
