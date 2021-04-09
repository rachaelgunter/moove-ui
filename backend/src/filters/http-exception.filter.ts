import { Catch, HttpException, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { InternalServerError } from '../errors/internal-server-error';
import { CustomError } from '../errors/custom-error';

@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException) {
    this.logger.error(exception);

    if (exception instanceof CustomError) {
      return exception;
    }

    return new InternalServerError('Unexpected error');
  }
}
