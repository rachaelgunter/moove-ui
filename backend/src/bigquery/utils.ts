import { InternalServerErrorException, Logger } from '@nestjs/common';

export function handleGoogleError(
  logger: Logger,
  errorMessage: string,
  error: Error,
): never {
  logger.error(errorMessage);
  logger.error(error.message);
  throw new InternalServerErrorException(errorMessage);
}
