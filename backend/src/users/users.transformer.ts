import { Injectable } from '@nestjs/common';
import { Organization, User as PrismaUser } from '@prisma/client';
import { User } from './users.types';

@Injectable()
export class UsersTransformer {
  transformUserToGraphQLResponseObject(
    user: PrismaUser & { organization?: Organization },
  ): User {
    const { email, role, organization, picture, name, id } = user;
    return {
      sub: id,
      email,
      name,
      picture,
      role,
      organization: organization?.name ?? null,
    };
  }
}
