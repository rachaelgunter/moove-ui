import {
  Catch,
  HttpException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { InternalServerError } from '../errors';
import { ApolloError, AuthenticationError } from 'apollo-server-errors';

@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException) {
    if (exception instanceof UnauthorizedException) {
      return new AuthenticationError('Unauthorized Error');
    }

    if (exception instanceof ApolloError) {
      return exception;
    }

    this.logger.error(exception);

    return new InternalServerError('Unexpected error');
  }
}
