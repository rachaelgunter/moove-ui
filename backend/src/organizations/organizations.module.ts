import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsResolver } from './organizations.resolver';
import { PrismaClient } from '.prisma/client';

@Module({
  providers: [OrganizationsService, OrganizationsResolver, PrismaClient],
})
export class OrganizationsModule {}
