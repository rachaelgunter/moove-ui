import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { DatasetsService } from './datasets.service';
import { DatasetParamsInput } from './datasets.types';

@Resolver()
export class DatasetsResolver {
  constructor(private readonly datasetsService: DatasetsService) {}

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
}
