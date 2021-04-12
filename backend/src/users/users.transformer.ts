import { Injectable } from '@nestjs/common';
import { Organization, User as PrismaUser } from '@prisma/client';
import { User } from './users.types';

@Injectable()
export class UsersTransformer {
  transformUserToGraphQLResponseObject(
    user: PrismaUser & { organization?: Organization },
  ): User {
    const { email, organization, picture, name, id } = user;
    return {
      sub: id,
      email,
      name,
      picture,
      organization: organization?.name ?? null,
      organizationObject: organization ?? null,
      ...(organization?.GCPProjectName && {
        GCPProjectName: organization.GCPProjectName,
      }),
      ...(organization?.GCPProjectName && {
        GCSBucketName: organization.GCSBucketName,
      }),
    };
  }
}
