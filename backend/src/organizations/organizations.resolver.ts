import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/users/users.types';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organizations.types';

@Resolver()
export class OrganizationsResolver {
  constructor(private organizationsService: OrganizationsService) {}

  @UseGuards(GqlAuthGuard)
  @Roles(Role.SUPER_ADMIN)
  @Query(() => [Organization])
  async organizations(): Promise<Organization[]> {
    return this.organizationsService.getOrganizations();
  }
}
