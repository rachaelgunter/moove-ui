import { Logger, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Parent,
  Context,
  ResolveField,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CurrentUser } from 'src/auth/graphql-current-user.decorator';
import { UsersService } from 'src/users/users.service';
import { UserTokenPayload } from 'src/users/users.types';
import { BigQueryClient } from './bigquery-client/bigquery-client';
import {
  BigQueryDataset,
  BigQueryProject,
  BigQueryResolverContext,
} from './bigquery.types';
import { handleGoogleError } from './utils';

@Resolver(() => BigQueryProject)
export class BigQueryProjectsResolver {
  private readonly logger: Logger = new Logger(BigQueryProjectsResolver.name);

  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [BigQueryProject])
  async getUsersProjects(
    @CurrentUser()
    user: UserTokenPayload,
    @Context()
    context: BigQueryResolverContext,
  ): Promise<BigQueryProject[]> {
    this.logger.log(
      `Resolving BigQuery projects for user ${JSON.stringify(user)}`,
    );

    try {
      const tokens = await this.usersService.getGoogleTokens(user.sub);
      const bigQueryClient = new BigQueryClient(tokens);

      context.bigQueryClient = bigQueryClient;
      const projects = await bigQueryClient.getProjects();
      return projects;
    } catch (e) {
      handleGoogleError(this.logger, `Unable to get BigQuery projects`, e);
    }
  }

  @ResolveField(() => [BigQueryDataset])
  async datasets(
    @Parent()
    project: BigQueryProject,
    @Context()
    context: BigQueryResolverContext,
  ): Promise<BigQueryDataset[]> {
    const { bigQueryClient } = context;
    try {
      const datasets = await bigQueryClient.getProjectDatasets(
        project.projectId,
      );
      return datasets;
    } catch (e) {
      handleGoogleError(
        this.logger,
        `Unable to get BigQuery datasets for project: ${project.projectId}`,
        e,
      );
    }
  }
}
