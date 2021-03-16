import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { DatasetsService } from './datasets.service';
import { Dataset, DatasetParamsInput } from './datasets.types';

@Resolver()
export class DatasetsResolver {
  constructor(private readonly datasetsService: DatasetsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async createDataset(
    @Args({ name: 'datasetParams' }) datasetParams: DatasetParamsInput,
  ): Promise<string> {
    return this.datasetsService.createDataset(datasetParams);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Dataset], { nullable: 'itemsAndList' })
  async getDatasets(): Promise<Dataset[]> {
    return this.datasetsService.getDatasets();
  }
}
