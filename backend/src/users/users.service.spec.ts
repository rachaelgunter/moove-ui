import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { prismaUserMock } from './users.mock';
import { UsersService } from './users.service';

const usersPrismaMock = {
  user: {
    upsert: () => null,
    findUnique: () => null,
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaClient],
    })
      .overrideProvider(PrismaClient)
      .useValue(usersPrismaMock)
      .compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaClient>(PrismaClient);
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
