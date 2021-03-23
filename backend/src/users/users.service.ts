import { Injectable, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { AppMetadata, UserMetadata, User } from 'auth0';
import { Auth0ClientService } from '../shared/auth0-client/auth0-client.service';
import { TokenPair, UserInput } from './users.types';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaClient,
    private readonly auth0ClientService: Auth0ClientService,
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

      const { refreshToken, accessToken } = this.isGoogleUser(freshUser.user_id)
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
    auth0User: User<AppMetadata, UserMetadata>,
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

  isGoogleUser(userId: string): boolean {
    return userId.includes('google');
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
}
