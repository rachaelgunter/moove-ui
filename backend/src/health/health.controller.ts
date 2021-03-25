import { Controller, Get, HttpStatus, Res, Logger } from '@nestjs/common';
import { Response } from 'express';
import { PrismaClient } from '@prisma/client';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly prisma: PrismaClient) {}

  @Get()
  async check(@Res() res: Response) {
    try {
      await this.prisma.$connect();

      res.status(HttpStatus.OK).json([]);
    } catch (error) {
      this.logger.error(`Checking prisma connection: `, error);
      res.status(HttpStatus.SERVICE_UNAVAILABLE).json({ error: error.message });
    }
  }
}
