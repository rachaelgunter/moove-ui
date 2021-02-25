import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersService } from './users.service';
import { UsersTransformer } from './users.transformer';

@Module({
  providers: [UsersService, UsersTransformer, PrismaClient],
  exports: [UsersService, UsersTransformer],
})
export class UsersModule {}
