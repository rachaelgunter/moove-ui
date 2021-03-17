import { InternalServerErrorException, Logger } from '@nestjs/common';

export function handleGoogleError(
  logger: Logger,
  errorMessage: string,
  error: Error,
): never {
  logger.error(errorMessage);
  logger.error(error.message);
  throw new InternalServerErrorException(errorMessage);
}

export const getPreviewTableHeaders = (fields, prefix = ''): string[] => {
  const res = [];

  const n = fields.length;
  for (let i = 0; i < n; i++) {
    if (!fields[i].fields) {
      res.push(prefix + fields[i].name);
    } else {
      res.push(
        ...getPreviewTableHeaders(
          fields[i].fields,
          prefix + fields[i].name + '.',
        ),
      );
    }
  }

  return res;
};

export const convertTableDataRowsToArray = (rows): string[][] => {
  const getEmptyRow = (columnsCount) => Array(columnsCount).fill('');
  const getFieldValues = (f) => {
    const fieldsCount = f.length;
    let maxColumnsCount = fieldsCount;
    const res = [getEmptyRow(fieldsCount)];
    const idx = 0;
    let currIndex = 0;

    for (let i = 0; i < fieldsCount; i++) {
      if (
        Array.isArray(f[i].v) ||
        (typeof f[i].v === 'object' && f[i].v && f[i].v.f)
      ) {
        let addIndex = idx; // 0
        const data = Array.isArray(f[i].v) ? f[i].v : [{ v: f[i].v }];
        for (let j = 0; j < data.length; j++) {
          const fRows = getFieldValues(data[j].v.f);

          fRows.forEach((row) => {
            if (typeof res[addIndex] === 'undefined') {
              res[addIndex] = getEmptyRow(maxColumnsCount);
            }

            res[addIndex].splice(currIndex, 1, ...row);
            addIndex++;
          });
        }

        currIndex = currIndex + res[addIndex - 1].length - maxColumnsCount + 1;
        maxColumnsCount = res[addIndex - 1].length;
      } else {
        res[idx][currIndex] = f[i].v;
        currIndex++;
      }
    }

    return res;
  };
  const getRowsValue = (rows) => {
    let res = [];
    for (let i = 0; i < rows.length; i++) {
      const rowsFieldValues = getFieldValues(rows[i].f);
      res = [...res, ...rowsFieldValues];
    }

    return res;
  };

  return getRowsValue(rows);
};
