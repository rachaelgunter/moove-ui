import { ApolloError } from 'apollo-server-errors';

export class SegmentNotFound extends ApolloError {
  constructor(message = 'Segment not found') {
    super(message, 'SEGMENT_NOT_FOUND');

    Object.defineProperty(this, 'name', { value: 'SegmentNotFound' });
  }
}
