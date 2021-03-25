import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { UsersTransformer } from 'src/users/users.transformer';
import { Role, User, UserInput, UserTokenPayload } from 'src/users/users.types';
import { GqlAuthGuard } from './graphql-auth.guard';
import { CurrentUser } from './graphql-current-user.decorator';
import { Roles } from 'src/auth/roles.decorator';

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly usersTransformer: UsersTransformer,
  ) {}

  @Roles(Role.USER, Role.PAID_USER, Role.ADMIN)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async syncUserData(
    @Args('signedInUser') signedInUser: UserInput,
  ): Promise<User> {
    try {
      const syncedUser = await this.usersService.syncUserInfo(signedInUser);
      return this.usersTransformer.transformUserToGraphQLResponseObject(
        syncedUser,
      );
    } catch (e) {
      this.logger.error(
        `Unable to sync user data for user: ${JSON.stringify(signedInUser)}`,
        e,
      );
      throw new InternalServerErrorException('Unable to sync user data');
    }
  }

  @Roles(Role.USER, Role.PAID_USER, Role.ADMIN)
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async getCurrentUser(@CurrentUser() user: UserTokenPayload): Promise<User> {
    try {
      const currentUser = await this.usersService.getUserById(user.sub);
      return this.usersTransformer.transformUserToGraphQLResponseObject(
        currentUser,
      );
    } catch (e) {
      throw new NotFoundException(`No user with id: ${user.sub}`);
    }
  }
}
