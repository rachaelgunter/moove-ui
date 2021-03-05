/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CurrentUser } from 'src/auth/graphql-current-user.decorator';
import { UsersService } from 'src/users/users.service';
import { UserTokenPayload } from 'src/users/users.types';
import { BigqueryClient } from './bigquery-client/bigquery-client';
import { BigQueryProject } from './bigquery.types';

@Resolver()
export class BigqueryResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [BigQueryProject])
  async getUsersProjects(
    @CurrentUser() user: UserTokenPayload,
  ): Promise<BigQueryProject[]> {
    try {
      const tokens = await this.usersService.getGoogleTokens(user.sub);
      const bigQueryClient = new BigqueryClient(tokens);
      return bigQueryClient.getProjects();
    } catch (e) {
      throw new NotFoundException(`No projects for user with id: ${user.sub}`);
    }
  }
}
