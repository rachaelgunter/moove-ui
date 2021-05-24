import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { Auth0ClientService } from '../shared/auth0-client/auth0-client.service';
import { prismaUserMock } from './users.mock';
import { UsersService } from './users.service';
import { Role } from './users.types';

const usersPrismaMock = {
  user: {
    upsert: () => null,
    findUnique: () => null,
  },
};

const auth0UsersMock = {
  users: [
    {
      user_id: '1234',
      email: 'user.email',
      app_metadata: {
        organization: {
          id: 1,
          name: 'org',
        },
      },
      created_at: 'user.created_at',
      last_login: 'user.last_login',
      name: 'user.name',
      picture: 'user.picture',
    },
    {
      user_id: '1235',
      email: 'user.email',
      app_metadata: {
        roles: ['ADMIN'],
      },
      created_at: 'user.created_at',
      last_login: 'user.last_login',
      name: 'user.name',
      picture: 'user.picture',
    },
  ],
  total: 2,
  start: 0,
  limit: 40,
  length: 2,
};

const auth0ClientServiceMock = {
  getUsersByEmail: () => [{ user_id: '1234' }],
  linkUsersAccounts: () => null,
  searchUsers: () => auth0UsersMock,
  createUser: () => null,
  sendPasswordChangeEmail: () => null,
  setEmailVerificationFlag: () => null,
};

const organizationsServiceMock = {
  getOrganizationById: () => ({ id: 1, name: 's' }),
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaClient;
  let auth0ClientService: Auth0ClientService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        PrismaClient,
        ConfigService,
        {
          provide: Auth0ClientService,
          useValue: auth0ClientServiceMock,
        },
        {
          provide: OrganizationsService,
          useValue: organizationsServiceMock,
        },
      ],
    })
      .overrideProvider(PrismaClient)
      .useValue(usersPrismaMock)
      .compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaClient>(PrismaClient);
    auth0ClientService = module.get<Auth0ClientService>(Auth0ClientService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('syncUserInfo', () => {
    beforeEach(() => {
      jest.spyOn(prisma.user, 'upsert').mockResolvedValue(prismaUserMock);
    });
    afterEach(() => jest.resetAllMocks());

    it('should call upsert with correct params if name is present in UserInput object', async () => {
      const userInput = {
        sub: '1234',
        email: 'email@test.com',
        name: 'name',
        picture: 'picture',
      };

      await service.syncUserInfo(userInput);

      expect(prisma.user.upsert).toHaveBeenCalledTimes(1);
      expect(prisma.user.upsert).toHaveBeenCalledWith({
        create: {
          id: '1234',
          accessToken: null,
          refreshToken: null,
          email: 'email@test.com',
          name: 'name',
          picture: 'picture',
        },
        update: {
          name: 'name',
          picture: 'picture',
        },
        where: { id: '1234' },
        include: {
          organization: true,
        },
      });
    });

    it('should call upsert with correct params if name is absent in UserInput object', async () => {
      const userInput = {
        sub: '1234',
        email: 'email@test.com',
        picture: 'picture',
      };

      await service.syncUserInfo(userInput);

      expect(prisma.user.upsert).toHaveBeenCalledTimes(1);
      expect(prisma.user.upsert).toHaveBeenCalledWith({
        create: {
          id: '1234',
          email: 'email@test.com',
          name: null,
          picture: 'picture',
          accessToken: null,
          refreshToken: null,
        },
        update: {
          name: null,
          picture: 'picture',
        },
        where: { id: '1234' },
        include: {
          organization: true,
        },
      });
    });

    it('should throw an error if any errors occur during DB query execution', async () => {
      jest
        .spyOn(prisma.user, 'upsert')
        .mockRejectedValue(new Error('some error'));

      try {
        await service.syncUserInfo({
          sub: '1234',
          email: 'email@test.com',
          picture: 'picture',
        });
      } catch (e) {
        expect(e).toStrictEqual(new Error('some error'));
      }
    });

    it('should link users accounts if the user has already been registered with another provider', async () => {
      jest
        .spyOn(auth0ClientService, 'getUsersByEmail')
        .mockResolvedValueOnce([{ user_id: '1234' }, { user_id: '2' }]);
      jest.spyOn(auth0ClientService, 'linkUsersAccounts');

      await service.syncUserInfo({
        sub: '1234',
        email: 'email@test.com',
        picture: 'picture',
      });

      expect(auth0ClientService.linkUsersAccounts).toHaveBeenCalledTimes(1);
      expect(auth0ClientService.linkUsersAccounts).toHaveBeenCalledWith(
        { user_id: '2' },
        { user_id: '1234' },
      );
    });

    it('should not link users accounts if the user has not been already registered', async () => {
      jest
        .spyOn(auth0ClientService, 'getUsersByEmail')
        .mockResolvedValueOnce([{ user_id: '1234' }]);
      jest.spyOn(auth0ClientService, 'linkUsersAccounts');

      await service.syncUserInfo({
        sub: '1234',
        email: 'email@test.com',
        picture: 'picture',
      });

      expect(auth0ClientService.linkUsersAccounts).not.toHaveBeenCalled();
    });

    it('should upsert user info for an existing account if the user was previously registered with another provider', async () => {
      jest
        .spyOn(auth0ClientService, 'getUsersByEmail')
        .mockResolvedValueOnce([{ user_id: '1234' }, { user_id: '2' }]);
      jest.spyOn(prisma.user, 'upsert');

      await service.syncUserInfo({
        sub: '1234',
        email: 'email@test.com',
        picture: 'picture',
      });

      expect(prisma.user.upsert).toHaveBeenCalledWith({
        create: {
          id: '2',
          email: 'email@test.com',
          name: null,
          picture: 'picture',
          accessToken: null,
          refreshToken: null,
        },
        update: {
          name: null,
          picture: 'picture',
        },
        where: { id: '2' },
        include: {
          organization: true,
        },
      });
    });
  });

  describe('getUserById', () => {
    beforeEach(() => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(prismaUserMock);
    });

    it('should call findUnique with correct params', async () => {
      await service.getUserById('12');

      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: '12' },
        include: {
          organization: true,
        },
      });
    });
  });

  describe('getUsersSearchQuery', () => {
    beforeEach(() => {
      jest.spyOn(configService, 'get').mockReturnValue('namespace');
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(prismaUserMock);
    });

    it('should return an empty string if the user is SUPER_ADMIN', async () => {
      const user = { sub: '1', ['namespace/roles']: ['SUPER_ADMIN'] };
      const query = await service.getUsersSearchQuery(user);
      expect(query).toStrictEqual('');
    });

    it("should return query string with user's org id if user is org ADMIN", async () => {
      const user = { sub: '1', ['namespace/roles']: ['ADMIN'] };
      const query = await service.getUsersSearchQuery(user);
      expect(query).toStrictEqual('app_metadata.organization.id:12');
    });
  });

  describe('searchUsers', () => {
    beforeEach(() => {
      jest
        .spyOn(auth0ClientService, 'searchUsers')
        .mockResolvedValue(auth0UsersMock);
    });

    it('should calculate page number', async () => {
      await service.searchUsers('', 12, 10);
      await service.searchUsers('', 0, 10);
      await service.searchUsers('', 20, 10);

      expect(auth0ClientService.searchUsers).nthCalledWith(1, '', 1, 10);
      expect(auth0ClientService.searchUsers).nthCalledWith(2, '', 0, 10);
      expect(auth0ClientService.searchUsers).nthCalledWith(3, '', 2, 10);
    });

    it('should transform API response to PaginatedUsers type', async () => {
      const result = await service.searchUsers('', 10, 10);
      expect(result).toStrictEqual({
        totalCount: 2,
        nodes: [
          {
            sub: '1234',
            email: 'user.email',
            organization: 'org',
            createdAt: 'user.created_at',
            lastLogin: 'user.last_login',
            name: 'user.name',
            roles: undefined,
            picture: 'user.picture',
          },
          {
            sub: '1235',
            email: 'user.email',
            organization: '',
            createdAt: 'user.created_at',
            lastLogin: 'user.last_login',
            name: 'user.name',
            roles: ['ADMIN'],
            picture: 'user.picture',
          },
        ],
      });
    });
  });

  describe('createUser', () => {
    let createUserSpy;
    let sendPasswordChangeEmailSpy;
    let setEmailVerificationFlagSpy;
    const createUserPayload = {
      name: 'name',
      email: 'email@test.com',
      organizationId: null,
    };

    const paidUsersPayloads = [
      { ...createUserPayload, role: Role.PAID_USER, email: '1' },
      { ...createUserPayload, role: Role.ADMIN, email: '2' },
    ];
    const nonPaidUsersPayloads = [
      { ...createUserPayload, role: Role.USER, email: '1' },
      { ...createUserPayload, role: Role.API_USER, email: '2' },
      { ...createUserPayload, role: Role.ROAD_IQ_PAID_USER, email: '3' },
    ];

    beforeEach(() => {
      createUserSpy = jest
        .spyOn(auth0ClientService, 'createUser')
        .mockResolvedValue(auth0UsersMock.users[0]);
      sendPasswordChangeEmailSpy = jest.spyOn(
        auth0ClientService,
        'sendPasswordChangeEmail',
      );
      setEmailVerificationFlagSpy = jest.spyOn(
        auth0ClientService,
        'setEmailVerificationFlag',
      );
    });

    afterEach(() => {
      setEmailVerificationFlagSpy.mockReset();
      sendPasswordChangeEmailSpy.mockReset();
    });

    it('should set user roles correctly', async () => {
      await service.createUser({
        ...createUserPayload,
        role: Role.ADMIN,
      });

      expect(createUserSpy).toHaveBeenCalledWith(
        'email@test.com',
        'name',
        null,
        [Role.USER, Role.PAID_USER, Role.ADMIN],
      );
    });

    it('should assign user to an org', async () => {
      await service.createUser({
        ...createUserPayload,
        organizationId: 1,
        role: Role.PAID_USER,
      });

      expect(createUserSpy).toHaveBeenCalledWith(
        'email@test.com',
        'name',
        { id: 1, name: 's' },
        [Role.USER, Role.PAID_USER, Role.ROAD_IQ_PAID_USER],
      );
    });

    it('should send password change email for non-paid users', async () => {
      for (const user of nonPaidUsersPayloads) {
        createUserSpy = jest
          .spyOn(auth0ClientService, 'createUser')
          .mockResolvedValue({ ...auth0UsersMock.users[0], email: user.email });
        await service.createUser(user);
        expect(sendPasswordChangeEmailSpy).toHaveBeenLastCalledWith(user.email);
      }
    });

    it('should not send password change email for paid users', async () => {
      for (const user of paidUsersPayloads) {
        createUserSpy = jest
          .spyOn(auth0ClientService, 'createUser')
          .mockResolvedValue({ ...auth0UsersMock.users[0], email: user.email });
        await service.createUser(user);
      }
      expect(sendPasswordChangeEmailSpy).not.toHaveBeenCalled();
    });

    it('should set email_verified flag to true for paid users', async () => {
      for (const user of paidUsersPayloads) {
        createUserSpy = jest
          .spyOn(auth0ClientService, 'createUser')
          .mockResolvedValue({
            ...auth0UsersMock.users[0],
            user_id: user.email,
          });
        await service.createUser(user);
        expect(setEmailVerificationFlagSpy).toHaveBeenLastCalledWith(
          user.email,
          true,
        );
      }
    });

    it('should not set email_verified flag to true for non-paid users', async () => {
      for (const user of nonPaidUsersPayloads) {
        createUserSpy = jest
          .spyOn(auth0ClientService, 'createUser')
          .mockResolvedValue({
            ...auth0UsersMock.users[0],
            user_id: user.email,
          });
        await service.createUser(user);
      }
      expect(setEmailVerificationFlagSpy).not.toHaveBeenCalled();
    });
  });
});
