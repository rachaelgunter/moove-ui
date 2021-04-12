import { InternalServerErrorException, Logger } from '@nestjs/common';

export function handleGoogleError(
  logger: Logger,
  errorMessage: string,
  error: Error,
): never {
  logger.error(errorMessage);
  logger.error(error);
  throw new InternalServerErrorException(errorMessage);
}

export const getPreviewTableData = (fields, rows, offset = 0) => {
  const getValuesForColumn = (idx, rows) => {
    return rows.map((row) => {
      return !!row?.f ? [row.f[idx].v] : row?.map((v) => v.f[idx].v) ?? [];
    });
  };
  const addEmptyValues = (res) => {
    const maxCntRows = Math.max(...res.map(({ values }) => values.length));
    for (let i = 0; i < maxCntRows; i++) {
      const maxCntSubRows = Math.max(
        ...res.map(({ values }) => values[i].length),
      );
      res.forEach((column) => {
        const cnt = column.values[i].length;

        if (cnt < maxCntSubRows) {
          column.values[i].push(...Array(maxCntSubRows - cnt).fill(''));
        }
      });
    }

    return res;
  };
  const generateEmptyResultArray = (results) => {
    const cntFields = results.length;
    const cntRows = results[0].values.reduce((result, rowValues) => {
      return result + rowValues.length;
    }, 0);

    const tableData = [];
    for (let i = 0; i < cntRows; i++) {
      tableData[i] = Array(cntFields).fill('');
    }
    return tableData;
  };
  const formatResults = (results, offset) => {
    const resultsWithEmptyValues = addEmptyValues(results);
    const tableData = generateEmptyResultArray(resultsWithEmptyValues);
    const headers = [];
    const getGroupedRows = (rows) => {
      if (!rows) {
        return [];
      }

      const groupedRows = [];
      const cntRows = rows[0].values.length;
      const cntCols = rows.length;

      for (let i = 0; i < cntRows; i += 1) {
        let rowsValues = [];
        const cntChildren = rows[0].values[i].length;

        for (let j = 0; j < cntCols; j += 1) {
          rowsValues = [...rowsValues, ...rows[j].values[i]];
        }

        groupedRows[i] = groupedRows[i] || {
          id: `group-${offset + i}`,
          rows: [],
        };

        for (let j = 0; j < rowsValues.length; j += 1) {
          const idx = j % cntChildren;

          groupedRows[i].rows[idx] = groupedRows[i].rows[idx] || {
            id: `row-${offset + i + idx}`,
            row: [],
          };
          groupedRows[i].rows[idx].row.push({
            id: `cell-${offset + i + idx}-${
              groupedRows[i].rows[idx].row.length
            }`,
            cell: rowsValues[j],
          });
        }
      }

      return groupedRows;
    };

    resultsWithEmptyValues.forEach((column, columnIndex) => {
      headers.push({
        name: column.name,
        type: column.type,
      });
      [].concat(...column.values).forEach((value, valueIndex) => {
        tableData[valueIndex][columnIndex] = value;
      });
    });

    return {
      groupedRows: getGroupedRows(resultsWithEmptyValues),
      rows: tableData,
      headers,
    };
  };

  let data = fields;
  let i = 0;
  const results = [];
  const stack = [
    {
      prefix: '',
      data,
      i,
      rows,
    },
  ];

  let stackIdx = i;

  while (stack.length !== 0) {
    if (data[i] && data[i].type !== 'RECORD') {
      const columnName = data[i].name;
      results.push({
        name: `${stack[stackIdx].prefix}${columnName}`,
        type: data[i].type,
        values: getValuesForColumn(i, stack[stackIdx].rows),
      });
      i++;
    } else if (
      data[i] &&
      data[i].type === 'RECORD' &&
      (data[i].mode === 'REPEATED' || !data[i].mode)
    ) {
      const stateRows = !data[i].mode
        ? stack[stackIdx].rows.map((row) => row.f[i].v)
        : stack[stackIdx].rows.map((row) => {
            if (typeof row.f === 'undefined') {
              return [].concat(
                ...row.map((item) => item.f[i].v.map((v) => v.v)),
              );
            }
            return row.f[i].v.map((v) => v.v);
          });
      stack.push({
        prefix: `${stack[stackIdx].prefix}${data[i].name}.`,
        data: data[i].fields,
        rows: stateRows,
        i,
      });
      stackIdx = stack.length - 1;
      data = stack[stackIdx].data;
      i = 0;
    } else {
      if (!data[i] && data.length > i) {
        throw new Error('unexpected error');
      }
      if (data[i]) {
        throw new Error('new type');
      }
    }

    if (data.length <= i) {
      const resultStack = stack.pop();
      stackIdx = stack.length - 1;

      if (stack.length > 0) {
        i = resultStack.i + 1;
        data = stack[stackIdx].data;
      }
    }
  }

  return formatResults(results, offset);
};
