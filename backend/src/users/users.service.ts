import { Injectable, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { UserInput } from './users.types';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaClient) {}

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
      const syncedUser = await this.prisma.user.upsert({
        create: {
          id: userInput.sub,
          email: userInput.email,
          name: userInput.name ?? null,
          picture: userInput.picture,
        },
        update: {
          name: userInput.name ?? null,
          picture: userInput.picture,
        },
        where: { id: userInput.sub },
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
}
