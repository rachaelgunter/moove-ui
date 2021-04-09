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
        {
          name: 'column5',
          type: 'RECORD',
          mode: 'REPEATED',
          fields: [
            {
              name: 'name1',
              type: 'STRING',
            },
            {
              name: 'name2',
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
            {
              v: [
                {
                  v: {
                    f: [
                      {
                        v: '12',
                      },
                      {
                        v: [
                          {
                            v: {
                              f: [
                                {
                                  v: '13',
                                },
                                {
                                  v: '14',
                                },
                              ],
                            },
                          },
                          {
                            v: {
                              f: [
                                {
                                  v: '15',
                                },
                                {
                                  v: '16',
                                },
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
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
          { name: 'column5.name1', type: 'STRING' },
          { name: 'column5.name2.name1', type: 'STRING' },
          { name: 'column5.name2.name2', type: 'STRING' },
        ],
        rows: [
          ['1', '2', '3', '4', '5', '6', '', '', '12', '13', '14'],
          ['', '', '', '', '8', '9', '', '', '', '15', '16'],
          ['', '', '', '', '10', '11', '', '', '', '', ''],
        ],
        groupedRows: [
          {
            id: 'group-0',
            rows: [
              {
                id: 'row-0',
                row: [
                  {
                    cell: '1',
                    id: 'cell-0-0',
                  },
                  {
                    cell: '2',
                    id: 'cell-0-1',
                  },
                  {
                    cell: '3',
                    id: 'cell-0-2',
                  },
                  {
                    cell: '4',
                    id: 'cell-0-3',
                  },
                  {
                    cell: '5',
                    id: 'cell-0-4',
                  },
                  {
                    cell: '6',
                    id: 'cell-0-5',
                  },
                  {
                    cell: '',
                    id: 'cell-0-6',
                  },
                  {
                    cell: '',
                    id: 'cell-0-7',
                  },
                  {
                    cell: '12',
                    id: 'cell-0-8',
                  },
                  {
                    cell: '13',
                    id: 'cell-0-9',
                  },
                  {
                    cell: '14',
                    id: 'cell-0-10',
                  },
                ],
              },
              {
                id: 'row-1',
                row: [
                  {
                    cell: '',
                    id: 'cell-1-0',
                  },
                  {
                    cell: '',
                    id: 'cell-1-1',
                  },
                  {
                    cell: '',
                    id: 'cell-1-2',
                  },
                  {
                    cell: '',
                    id: 'cell-1-3',
                  },
                  {
                    cell: '8',
                    id: 'cell-1-4',
                  },
                  {
                    cell: '9',
                    id: 'cell-1-5',
                  },
                  {
                    cell: '',
                    id: 'cell-1-6',
                  },
                  {
                    cell: '',
                    id: 'cell-1-7',
                  },
                  {
                    cell: '',
                    id: 'cell-1-8',
                  },
                  {
                    cell: '15',
                    id: 'cell-1-9',
                  },
                  {
                    cell: '16',
                    id: 'cell-1-10',
                  },
                ],
              },
              {
                id: 'row-2',
                row: [
                  {
                    cell: '',
                    id: 'cell-2-0',
                  },
                  {
                    cell: '',
                    id: 'cell-2-1',
                  },
                  {
                    cell: '',
                    id: 'cell-2-2',
                  },
                  {
                    cell: '',
                    id: 'cell-2-3',
                  },
                  {
                    cell: '10',
                    id: 'cell-2-4',
                  },
                  {
                    cell: '11',
                    id: 'cell-2-5',
                  },
                  {
                    cell: '',
                    id: 'cell-2-6',
                  },
                  {
                    cell: '',
                    id: 'cell-2-7',
                  },
                  {
                    cell: '',
                    id: 'cell-2-8',
                  },
                  {
                    cell: '',
                    id: 'cell-2-9',
                  },
                  {
                    cell: '',
                    id: 'cell-2-10',
                  },
                ],
              },
            ],
          },
        ],
      });
    });
  });
});
