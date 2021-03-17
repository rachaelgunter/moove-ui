import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { DatasetsService } from './datasets.service';
import { Dataset, DatasetParamsInput } from './datasets.types';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/users/users.types';

@Resolver()
export class DatasetsResolver {
  constructor(private readonly datasetsService: DatasetsService) {}

  @Roles(Role.PAID_USER, Role.ADMIN)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async createDataset(
    @Args({ name: 'datasetParams' }) datasetParams: DatasetParamsInput,
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
}
