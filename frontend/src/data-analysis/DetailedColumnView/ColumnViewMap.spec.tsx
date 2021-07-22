
import { ColumnType } from '../types';
import { getData } from './ColumnViewMap';

const mockedNumericMapDataResponse = {
  previewTable: {
    headers: [
      {
        name: 'longitudinalAcc',
        type: ColumnType.INTEGER,
      },
      { name: 'latitude', type: ColumnType.FLOAT },
      {
        name: 'longitude',
        type: ColumnType.FLOAT,
      },
    ],
    rows: [
      ['-2', '25.972559', '-80.210675'],
      [null, '28.596238', '-80.85127'],
    ],
  },
};

const mockedStringMapDataResponse = {
  previewTable: {
    headers: [
      {
        name: 'longitudinalAcc',
        type: ColumnType.GEOGRAPHY,
      },
      { name: 'latitude', type: ColumnType.FLOAT },
      {
        name: 'longitude',
        type: ColumnType.FLOAT,
      },
    ],
    rows: [
      ['(1,1)', '25.972559', '-80.210675'],
      ['(1,1)', '28.596238', '-80.85127'],
    ],
  },
};

describe('ColumnViewMap', () => {
  describe('getData', () => {
    it('should transform data to Kepler format for numeric fields', () => {
      const expected = {
        info: { label: 'longitudinalAcc', id: 'longitudinalAcc analysis_data' },
        data: {
          fields: [
            {
              name: 'longitudinalAcc',
              type: 'INTEGER',
            },
            {
              name: 'latitude',
              type: 'FLOAT',
            },
            {
              name: 'longitude',
              type: 'FLOAT',
            },
          ],
          rows: [
            [-2, 25.972559, -80.210675],
            [0, 28.596238, -80.85127],
          ],
        },
      };

      expect(
        getData(mockedNumericMapDataResponse, 'longitudinalAcc'),
      ).toStrictEqual(expected);
    });

    it('should transform data to Kepler format for non-numeric fields', () => {
      const expected = {
        info: { label: 'longitudinalAcc', id: 'longitudinalAcc analysis_data' },
        data: {
          fields: [
            {
              name: 'longitudinalAcc',
              type: 'GEOGRAPHY',
            },
            {
              name: 'latitude',
              type: 'FLOAT',
            },
            {
              name: 'longitude',
              type: 'FLOAT',
            },
          ],
          rows: [
            ['(1,1)', 25.972559, -80.210675],
            ['(1,1)', 28.596238, -80.85127],
          ],
        },
      };

      expect(
        getData(mockedStringMapDataResponse, 'longitudinalAcc'),
      ).toStrictEqual(expected);
    });
  });
});