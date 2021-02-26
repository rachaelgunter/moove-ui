import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health')
export class HealthController {
  @Get()
  check(@Res() res: Response) {
    res.status(HttpStatus.OK).json([]);
  }
}
