import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersService } from 'src/users/users.service';
import { BigqueryClientService } from './bigquery-client/bigquery-client.service';
import { BigQueryService } from './bigquery.service';

const mockData = {
  rows: [
    [
      '21091',
      '21091',
      '39.707948396093066',
      '39.370502',
      '40.199764',
      '21091',
      '0.15896256852076426',
      '837480.33962200035',
      '0.025269098190718674',
    ],
  ],
  headers: [
    { name: 'total_count', type: 'INTEGER' },
    { name: 'uuid_uniq_count', type: 'INTEGER' },
    { name: 'latitude_AVG', type: 'FLOAT' },
    { name: 'latitude_MIN', type: 'FLOAT' },
    { name: 'latitude_MAX', type: 'FLOAT' },
    { name: 'latitude_COUNT', type: 'INTEGER' },
    { name: 'latitude_STDDEV', type: 'FLOAT' },
    { name: 'latitude_SUM', type: 'FLOAT' },
    { name: 'latitude_VARIANCE', type: 'FLOAT' },
  ],
  tableMetadata: {
    totalRows: 21091,
  },
};

describe('BigQueryService', () => {
  let client: BigQueryService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BigQueryService,
        BigqueryClientService,
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
      imports: [HttpModule],
    }).compile();

    client = await moduleRef.resolve<BigQueryService>(BigQueryService);
  });

  describe('mapColumnsTable', () => {
    it('should map data for column table correctly', () => {
      expect(client.mapColumnsTable(mockData)).toStrictEqual([
        {
          average: '39.707948396093066',
          min: '39.370502',
          name: 'latitude',
          type: 'FLOAT',
          max: '40.199764',
          count: '21091',
          standardDeviation: '0.15896256852076426',
          sum: '837480.33962200035',
          variance: '0.025269098190718674',
          populated: 100,
        },
      ]);
    });
  });
});
