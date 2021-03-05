import { Test, TestingModule } from '@nestjs/testing';
import { BigQueryProjectsResolver } from './bigquery-projects.resolver';

describe('BigqueryResolver', () => {
  let resolver: BigQueryProjectsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BigQueryProjectsResolver],
    }).compile();

    resolver = module.get<BigQueryProjectsResolver>(BigQueryProjectsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
