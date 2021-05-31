import { Query, Resolver } from '@nestjs/graphql';
import { PrismaClient } from '.prisma/client';

import { BusinessVertical, JobFunction } from './dictionaries.types';

@Resolver()
export class DictionariesResolver {
  constructor(private prismaClient: PrismaClient) {}

  @Query(() => [BusinessVertical])
  async businessVerticals(): Promise<BusinessVertical[]> {
    return this.prismaClient.businessVertical.findMany();
  }

  @Query(() => [JobFunction])
  async jobFunctions(): Promise<JobFunction[]> {
    return this.prismaClient.jobFunction.findMany();
  }
}
