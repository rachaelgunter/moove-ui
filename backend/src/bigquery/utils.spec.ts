import { convertTableDataRowsToArray } from './utils';

describe('big query utils', () => {
  describe('convertTableDataRowsToArray', () => {
    const data = {
      rows: [
        {
          f: [
            {
              v: '1',
            },
            {
              v: {
                f: [
                  {
                    v: '2',
                  },
                  {
                    v: '3',
                  },
                  {
                    v: '4',
                  },
                ],
              },
            },
            {
              v: [
                {
                  v: {
                    f: [
                      {
                        v: '5',
                      },
                      {
                        v: '6',
                      },
                    ],
                  },
                },
                {
                  v: {
                    f: [
                      {
                        v: '8',
                      },
                      {
                        v: '9',
                      },
                    ],
                  },
                },
                {
                  v: {
                    f: [
                      {
                        v: '10',
                      },
                      {
                        v: '11',
                      },
                    ],
                  },
                },
              ],
            },
            {
              v: '7',
            },
          ],
        },
      ],
    };
    it('should return rows', () => {
      expect(convertTableDataRowsToArray(data.rows)).toStrictEqual([
        ['1', '2', '3', '4', '5', '6', '7'],
        ['', '', '', '', '8', '9', ''],
        ['', '', '', '', '10', '11', ''],
      ]);
    });
  });
});
