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
import { Role, UserTokenPayload } from 'src/users/users.types';
import { BigqueryClientService } from './bigquery-client/bigquery-client.service';
import {
  BigQueryDataset,
  BigQueryProject,
  BigQueryResolverContext,
} from './bigquery.types';
import { handleGoogleError } from './utils';
import { Roles } from 'src/auth/roles.decorator';

@Resolver(() => BigQueryProject)
export class BigQueryProjectsResolver {
  private readonly logger: Logger = new Logger(BigQueryProjectsResolver.name);

  constructor(private readonly bigqueryClientService: BigqueryClientService) {}

  @Roles(Role.PAID_USER, Role.ADMIN)
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
      context.bigQueryClient = this.bigqueryClientService;
      const projects = await this.bigqueryClientService.getProjects();
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
