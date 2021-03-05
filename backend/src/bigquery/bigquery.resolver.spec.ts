import { Test, TestingModule } from '@nestjs/testing';
import { BigqueryResolver } from './bigquery.resolver';

describe('BigqueryResolver', () => {
  let resolver: BigqueryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BigqueryResolver],
    }).compile();

    resolver = module.get<BigqueryResolver>(BigqueryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
