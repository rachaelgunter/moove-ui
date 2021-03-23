import { BigqueryClientService } from './bigquery-client.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';

const mockAPIProjects = [
  {
    kind: 'bigquery#project',
    id: 'moove-main',
    numericId: '472403240126',
    projectReference: {
      projectId: 'moove-main',
    },
    friendlyName: 'Moove main',
  },
  {
    kind: 'bigquery#project',
    id: 'moove-data-exports',
    numericId: '587162198132',
    projectReference: {
      projectId: 'moove-data-exports',
    },
    friendlyName: 'moove-data-exports',
  },
];
const mockAPIDatasets = [
  {
    kind: 'bigquery#dataset',
    id: 'moove-main:accident',
    datasetReference: {
      datasetId: 'accident',
      projectId: 'moove-main',
    },
    location: 'US',
  },
  {
    kind: 'bigquery#dataset',
    id: 'moove-main:census_roads',
    datasetReference: {
      datasetId: 'census_roads',
      projectId: 'moove-main',
    },
    location: 'US',
  },
];
const mockAPITables = [
  {
    kind: 'bigquery#table',
    id: 'moove-main:accident.us_colorado_denver_collisions',
    tableReference: {
      projectId: 'moove-main',
      datasetId: 'accident',
      tableId: 'us_colorado_denver_collisions',
    },
    type: 'TABLE',
    creationTime: '1562192530660',
  },
  {
    kind: 'bigquery#table',
    id: 'moove-main:accident.us_illinois_chicago_collisions',
    tableReference: {
      projectId: 'moove-main',
      datasetId: 'accident',
      tableId: 'us_illinois_chicago_collisions',
    },
    type: 'TABLE',
    creationTime: '1556504079659',
  },
];

describe('BigQueryClient', () => {
  let client: BigqueryClientService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BigqueryClientService,
        {
          provide: UsersService,
          useValue: {},
        },
      ],
    }).compile();

    client = await moduleRef.resolve<BigqueryClientService>(
      BigqueryClientService,
    );
  });

  describe('mapProjects', () => {
    it('should map projects google API data correctly', () => {
      expect(client.mapProjects({ projects: mockAPIProjects })).toStrictEqual([
        {
          projectId: 'moove-main',
          numericId: '472403240126',
          friendlyName: 'Moove main',
        },
        {
          projectId: 'moove-data-exports',
          numericId: '587162198132',
          friendlyName: 'moove-data-exports',
        },
      ]);
    });
  });

  describe('mapDatasets', () => {
    it('should map datasets google API data correctly', () => {
      expect(client.mapDatasets({ datasets: mockAPIDatasets })).toStrictEqual([
        {
          datasetId: 'accident',
          projectId: 'moove-main',
        },
        {
          datasetId: 'census_roads',
          projectId: 'moove-main',
        },
      ]);
    });
  });

  describe('mapTables', () => {
    it('should map tables google API data correctly', () => {
      expect(client.mapTables({ tables: mockAPITables })).toStrictEqual([
        {
          datasetId: 'accident',
          tableId: 'us_colorado_denver_collisions',
        },
        {
          datasetId: 'accident',
          tableId: 'us_illinois_chicago_collisions',
        },
      ]);
    });
  });
});
