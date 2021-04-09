import { CustomError } from './custom-error';

export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 'INTERNAL_SERVER_ERROR');

    Object.defineProperty(this, 'name', { value: 'InternalServerError' });
  }
}
