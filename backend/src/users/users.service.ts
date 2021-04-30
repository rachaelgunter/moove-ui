import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { AppMetadata, UserMetadata, User as Auth0User } from 'auth0';

import { OrganizationsService } from 'src/organizations/organizations.service';
import { matchRoles } from 'src/shared/users/roles-matcher';
import { Auth0ClientService } from '../shared/auth0-client/auth0-client.service';
import {
  TokenPair,
  UserInput,
  Role,
  UserTokenPayload,
  PaginatedUsers,
  CreateUserPayload,
  User,
  auth0RolesMap,
  DeletedUser,
  DeleteUserPayload,
} from './users.types';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaClient,
    private readonly auth0ClientService: Auth0ClientService,
    private readonly configService: ConfigService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  async syncUserInfo(
    userInput: UserInput,
  ): Promise<
    Prisma.UserGetPayload<{
      include: {
        organization: true;
      };
    }>
  > {
    this.logger.log(
      `Upserting user info for user: ${JSON.stringify(userInput)}`,
    );
    try {
      const users = await this.auth0ClientService.getUsersByEmail(
        userInput.email,
      );
      const existingUser = users.find((user) => user.user_id !== userInput.sub);
      const freshUser = users.find((user) => user.user_id === userInput.sub);

      if (existingUser) {
        await this.auth0ClientService.linkUsersAccounts(
          existingUser,
          freshUser,
        );
      }

      const { refreshToken, accessToken } = this.isPaidUser(existingUser)
        ? this.getGoogleTokensFromAuth0User(freshUser)
        : { accessToken: null, refreshToken: null };

      const organizationId = existingUser?.app_metadata?.organization?.id;

      const syncedUser = await this.prisma.user.upsert({
        create: {
          id: existingUser?.user_id ?? userInput.sub,
          email: userInput.email,
          name: userInput.name ?? null,
          picture: userInput.picture,
          accessToken,
          refreshToken,
          ...(organizationId && {
            organizationId,
          }),
        },
        update: {
          name: userInput.name ?? null,
          picture: userInput.picture,
          ...(accessToken && { accessToken }),
          ...(refreshToken && { refreshToken }),
          ...(organizationId && {
            organizationId,
          }),
        },
        where: { id: existingUser ? existingUser.user_id : userInput.sub },
        include: {
          organization: true,
        },
      });
      return syncedUser;
    } catch (e) {
      this.logger.error(
        `Unable to upsert user info for user: ${JSON.stringify(userInput)} `,
        e,
      );
      throw e;
    }
  }

  async getUserById(
    id: string,
  ): Promise<
    Prisma.UserGetPayload<{
      include: {
        organization: true;
      };
    }>
  > {
    this.logger.log(`Getting user info for user with id: ${id}`);

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        organization: true,
      },
    });

    return user;
  }

  getGoogleTokensFromAuth0User(
    auth0User: Auth0User<AppMetadata, UserMetadata>,
  ): TokenPair {
    const googleIdentity = auth0User.identities.find(
      (identity) => identity.provider === 'google-oauth2',
    );

    return {
      accessToken: googleIdentity.access_token,
      refreshToken: ((googleIdentity as unknown) as { refresh_token: string })
        .refresh_token,
    };
  }

  isPaidUser(user: Auth0User<AppMetadata, UserMetadata>): boolean {
    return user?.app_metadata?.roles?.includes(Role.PAID_USER) ?? false;
  }

  async getGoogleTokens(userId: string): Promise<TokenPair> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { accessToken: true, refreshToken: true },
    });
  }

  async updateGoogleTokens(
    userId: string,
    tokens: { accessToken?: string; refreshToken?: string },
  ) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: tokens,
    });
  }

  async searchUsers(
    query: string,
    offset: number,
    limit: number,
  ): Promise<PaginatedUsers> {
    const page = Math.floor(offset / limit);

    return this.auth0ClientService
      .searchUsers(query, page, limit)
      .then((users) => ({
        totalCount: users.total,
        nodes: users.users.map((user: Auth0User) => ({
          sub: user.user_id,
          email: user.email,
          organization: user.app_metadata?.organization?.name ?? '',
          createdAt: user.created_at,
          lastLogin: user.last_login,
          name: user.name,
          roles: user.app_metadata?.roles,
          picture: user.picture,
        })),
      }));
  }

  async getUsersSearchQuery(user: UserTokenPayload): Promise<string> {
    const claimsNamespace = this.configService.get('AUTH0_CLAIMS_NAMESPACE');
    if (matchRoles(user[`${claimsNamespace}/roles`], [Role.SUPER_ADMIN])) {
      return '';
    }
    const { organizationId } = await this.getUserById(user.sub);
    return `app_metadata.organization.id:${organizationId}`;
  }

  async createUser(createUserPayload: CreateUserPayload): Promise<User> {
    const { name, email, organizationId, role } = createUserPayload;
    const organization = organizationId
      ? await this.organizationsService.getOrganizationById(organizationId)
      : null;
    this.logger.log(`Creating user: ${createUserPayload}`);
    const user: Auth0User = await this.auth0ClientService.createUser(
      email,
      name,
      organization,
      auth0RolesMap[role],
    );

    if ([Role.API_USER, Role.USER, Role.ROAD_IQ_PAID_USER].includes(role)) {
      this.logger.log(
        `Sending password change email for user: ${createUserPayload}`,
      );
      await this.auth0ClientService.sendPasswordChangeEmail(user.email);
    }

    if ([Role.PAID_USER, Role.ADMIN, Role.SUPER_ADMIN].includes(role)) {
      await this.auth0ClientService.setEmailVerificationFlag(
        user.user_id,
        true,
      );
    }

    return {
      sub: user.user_id,
      email: user.email,
      organization: user.app_metadata.organization?.name,
      organizationObject: user.app_metadata.organization,
      picture: user.picture,
      createdAt: user.created_at,
      lastLogin: user.last_login,
    };
  }

  async deleteUser(deleteUserPayload: DeleteUserPayload): Promise<DeletedUser> {
    const { email, sub } = deleteUserPayload;

    this.logger.log(`Deleting user: ${email}`);

    try {
      await this.auth0ClientService.isExistUser(sub);

      await this.auth0ClientService.deleteUser(sub);

      await this.auth0ClientService.isDeletedUser(sub);

      const deletedUser = await this.prisma.user.delete({ where: { email } });

      return { email: deletedUser.email };
    } catch (e) {
      this.logger.error(`Failed to delete user ${email}: ${JSON.stringify(e)}`);

      throw e;
    }
  }
}
