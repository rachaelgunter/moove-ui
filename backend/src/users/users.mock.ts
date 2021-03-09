import { Organization, Role, User as PrismaUser } from '@prisma/client';
import { User } from './users.types';

export const prismaUserMock: PrismaUser & { organization: Organization } = {
  id: '1234',
  email: 'test@mail.com',
  name: 'name',
  picture: 'http://picture.com',
  createdAt: new Date(2020, 10, 2),
  role: Role.FREEMIUM,
  organizationId: 12,
  organization: {
    id: 12,
    name: 'test org',
  },
  refreshToken: null,
  accessToken: null,
};

export const graphqlUserMock: User = {
  sub: '1234',
  email: 'test@mail.com',
  name: 'name',
  picture: 'http://picture.com',
  role: 'FREEMIUM',
  organization: 'test org',
};
