import { Module } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';

import { DictionariesResolver } from './dictionaries.resolver';

@Module({
  providers: [DictionariesResolver, PrismaClient],
})
export class DictionariesModule {}
