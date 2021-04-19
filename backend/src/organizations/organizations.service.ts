import { PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { Organization } from './organizations.types';

@Injectable()
export class OrganizationsService {
  constructor(private prismaClient: PrismaClient) {}

  async getOrganizations(): Promise<Organization[]> {
    return await this.prismaClient.organization.findMany();
  }

  async getOrganizationById(id: number): Promise<Organization | null> {
    return this.prismaClient.organization.findUnique({ where: { id } });
  }
}
