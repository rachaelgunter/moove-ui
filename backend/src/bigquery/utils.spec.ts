import { getPreviewTableData } from './utils';

describe('big query utils', () => {
  describe('getPreviewTableData', () => {
    const data = {
      fields: [
        {
          name: 'column1',
          type: 'STRING',
        },
        {
          name: 'column2',
          type: 'RECORD',
          fields: [
            {
              name: 'name1',
              type: 'STRING',
            },
            {
              name: 'name2',
              type: 'STRING',
            },
            {
              name: 'name3',
              type: 'STRING',
            },
          ],
        },
        {
          name: 'column3',
          type: 'RECORD',
          mode: 'REPEATED',
          fields: [
            {
              name: 'name1',
              type: 'STRING',
            },
            {
              name: 'name2',
              type: 'STRING',
            },
          ],
        },
        {
          name: 'column4',
          type: 'RECORD',
          mode: 'REPEATED',
          fields: [
            {
              name: 'name1',
              type: 'STRING',
            },
            {
              name: 'name2',
              type: 'STRING',
            },
          ],
        },
      ],
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
              v: [],
            },
          ],
        },
      ],
    };
    it('should return rows', () => {
      expect(getPreviewTableData(data.fields, data.rows)).toStrictEqual({
        headers: [
          { name: 'column1', type: 'STRING' },
          { name: 'column2.name1', type: 'STRING' },
          { name: 'column2.name2', type: 'STRING' },
          { name: 'column2.name3', type: 'STRING' },
          { name: 'column3.name1', type: 'STRING' },
          { name: 'column3.name2', type: 'STRING' },
          { name: 'column4.name1', type: 'STRING' },
          { name: 'column4.name2', type: 'STRING' },
        ],
        rows: [
          ['1', '2', '3', '4', '5', '6', '', ''],
          ['', '', '', '', '8', '9', '', ''],
          ['', '', '', '', '10', '11', '', ''],
        ],
      });
    });
  });
});
