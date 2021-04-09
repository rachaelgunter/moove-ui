import { CustomError } from './custom-error';

export class SegmentNotFound extends CustomError {
  constructor(message = 'SEGMENT_NOT_FOUND') {
    super(message, 'SEGMENT_NOT_FOUND');

    Object.defineProperty(this, 'name', { value: 'SegmentNotFound' });
  }
}
