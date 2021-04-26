import { ApolloError } from 'apollo-server-errors';

export class DatasourceValidationError extends ApolloError {
  constructor(message = 'Source data is not valid') {
    super(message, 'DATASOURCE_VALIDATION_ERROR');

    Object.defineProperty(this, 'name', { value: 'DatasourceValidationError' });
  }
}
