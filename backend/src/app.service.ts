import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prismaClient: PrismaClient) {}
  getHello(): Promise<User[]> {
    return this.prismaClient.user.findMany();
  }
}
