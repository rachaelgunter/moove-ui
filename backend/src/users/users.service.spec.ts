import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { Auth0ClientService } from '../shared/auth0-client/auth0-client.service';
import { prismaUserMock } from './users.mock';
import { UsersService } from './users.service';

const usersPrismaMock = {
  user: {
    upsert: () => null,
    findUnique: () => null,
  },
};

const auth0ClientServiceMock = {
  getUsersByEmail: () => [{ user_id: '1234' }],
  linkUsersAccounts: () => null,
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaClient;
  let auth0ClientService: Auth0ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        PrismaClient,
        {
          provide: Auth0ClientService,
          useValue: auth0ClientServiceMock,
        },
      ],
    })
      .overrideProvider(PrismaClient)
      .useValue(usersPrismaMock)
      .compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaClient>(PrismaClient);
    auth0ClientService = module.get<Auth0ClientService>(Auth0ClientService);
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
          id: '1234',
          email: 'email@test.com',
          name: null,
          picture: 'picture',
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
});
