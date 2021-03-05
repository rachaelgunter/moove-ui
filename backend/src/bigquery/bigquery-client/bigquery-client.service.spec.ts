import { Test, TestingModule } from '@nestjs/testing';
import { BigqueryClient } from './bigquery-client';

describe('BigqueryClient', () => {
  let service: BigqueryClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BigqueryClient],
    }).compile();

    service = module.get<BigqueryClient>(BigqueryClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
