import { BadRequestException, UseGuards, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { DatasetsService } from './datasets.service';
import {
  ColumnVisualizationParams,
  Dataset,
  DatasetParamsInput,
} from './datasets.types';
import { Roles } from 'src/auth/roles.decorator';
import { Role, UserTokenPayload } from 'src/users/users.types';
import { CurrentUser } from 'src/auth/graphql-current-user.decorator';

@Resolver()
export class DatasetsResolver {
  constructor(private readonly datasetsService: DatasetsService) {}

  @Roles(Role.PAID_USER, Role.ADMIN)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async createDataset(
    @Args({ name: 'datasetParams' }, new ValidationPipe())
    datasetParams: DatasetParamsInput,
  ): Promise<string> {
    try {
      const response = await this.datasetsService.createDataset(datasetParams);
      return response;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Roles(Role.PAID_USER, Role.ADMIN)
  @UseGuards(GqlAuthGuard)
  @Query(() => [Dataset], { nullable: 'itemsAndList' })
  async getDatasets(): Promise<Dataset[]> {
    return this.datasetsService.getDatasets();
  }

  @Roles(Role.PAID_USER, Role.ADMIN)
  @UseGuards(GqlAuthGuard)
  @Query(() => [String], { nullable: 'itemsAndList' })
  async datasetColumnVisualizations(
    @CurrentUser()
    user: UserTokenPayload,
    @Args() args: ColumnVisualizationParams,
  ): Promise<string[]> {
    const { bucketName, analysisName, columnName, subFolder } = args;

    return this.datasetsService.getColumnVisualizations(
      bucketName,
      analysisName,
      columnName,
      subFolder,
    );
  }
}
