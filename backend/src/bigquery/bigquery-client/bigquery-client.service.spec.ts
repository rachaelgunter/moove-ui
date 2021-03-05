import { Test, TestingModule } from '@nestjs/testing';
import { BigQueryClient } from './bigquery-client';

describe('BigQueryClient', () => {
  let service: BigQueryClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BigQueryClient],
    }).compile();

    service = module.get<BigQueryClient>(BigQueryClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
