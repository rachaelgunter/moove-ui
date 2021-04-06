import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CurrentUser } from 'src/auth/graphql-current-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { OffsetPaginationParams } from 'src/shared/types';
import { UsersService } from './users.service';
import { PaginatedUsers, Role, UserTokenPayload } from './users.types';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(GqlAuthGuard)
  @Query(() => PaginatedUsers)
  async users(
    @CurrentUser() user: UserTokenPayload,
    @Args() args: OffsetPaginationParams,
  ): Promise<PaginatedUsers> {
    const { offset, limit } = args;
    const query = await this.usersService.getUsersSearchQuery(user);
    return this.usersService.searchUsers(query, offset, limit);
  }
}
