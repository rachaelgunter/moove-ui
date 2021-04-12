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

      const { refreshToken, accessToken } = this.isPaidUser(freshUser)
        ? this.getGoogleTokensFromAuth0User(freshUser)
        : { accessToken: null, refreshToken: null };

      const syncedUser = await this.prisma.user.upsert({
        create: {
          id: userInput.sub,
          email: userInput.email,
          name: userInput.name ?? null,
          picture: userInput.picture,
          accessToken,
          refreshToken,
        },
        update: {
          name: userInput.name ?? null,
          picture: userInput.picture,
          accessToken,
          refreshToken,
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
    const organization = await this.organizationsService.getOrganizationById(
      organizationId,
    );
    const user: Auth0User = await this.auth0ClientService.createUser(
      email,
      name,
      organization,
      role,
    );

    return {
      sub: user.user_id,
      email: user.email,
      organization: user.app_metadata.organization.name,
      organizationObject: user.app_metadata.organization,
      picture: user.picture,
      createdAt: user.created_at,
      lastLogin: user.last_login,
    };
  }
}
