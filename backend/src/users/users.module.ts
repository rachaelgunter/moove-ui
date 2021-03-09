import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Auth0ClientService } from 'src/shared/auth0-client/auth0-client.service';
import { UsersService } from './users.service';
import { UsersTransformer } from './users.transformer';

@Module({
  providers: [UsersService, UsersTransformer, PrismaClient, Auth0ClientService],
  exports: [UsersService, UsersTransformer],
})
export class UsersModule {}
