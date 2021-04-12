import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { Auth0ClientService } from 'src/shared/auth0-client/auth0-client.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersTransformer } from './users.transformer';

@Module({
  providers: [
    UsersService,
    UsersTransformer,
    PrismaClient,
    Auth0ClientService,
    UsersResolver,
    OrganizationsService,
  ],
  exports: [UsersService, UsersTransformer],
})
export class UsersModule {}
