import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import { DATASET_COLUMNS_QUERY } from 'src/data-analysis/queries';
import TableOverlay from 'src/shared/TableOverlay/TableOverlay';
import { ColumnModel } from 'src/data-analysis/types';
import CreateDatasetContext from '../CreateDatasetContext';

const useStyles = makeStyles((theme: Theme) => ({
  selector: {
    border: 'solid 1px',
    borderColor: '#fff',
    borderRadius: theme.spacing(4),
    marginTop: theme.spacing(1),
    fontSize: '14px',

    '& .MuiSelect-iconOutlined': {
      color: '#fff',
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
  },
}));

const IngestionOptionsPage: React.FC = () => {
  const classes = useStyles();

  const { selectedTable } = useContext(CreateDatasetContext);
  const { data: datasetColumns, loading: columnsLoading, error } = useQuery(
    DATASET_COLUMNS_QUERY,
    {
      variables: {
        projectId: selectedTable?.projectId,
        datasetId: selectedTable?.datasetId,
        tableId: selectedTable?.tableId,
      },
    },
  );

  const [coordsType, setCoordsType] = useState<string | null>(null);
  const [coordsColumn, setCoordsColumn] = useState<string>('');
  const [timestampColumn, setTimestampColumn] = useState<string>('');

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('datasetColumns: ', datasetColumns);
    // eslint-disable-next-line no-console
    console.log('selectedTable: ', selectedTable);
  }, [datasetColumns, selectedTable]);

  const handleCoordsTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCoordsType(event.target.value);
  };

  const handleCoordsColumnChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setCoordsColumn(event.target.value as string);
  };

  const handleTimestampColumnChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setTimestampColumn(event.target.value as string);
  };

  const getMenuItems = (columnType: string): Array<string> => {
    return datasetColumns?.columnsTable
      ?.filter((column: ColumnModel) => column.type === columnType)
      .map(({ name }: ColumnModel) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ));
  };

  return (
    <TableOverlay
      loading={columnsLoading}
      error={!!error}
      data={datasetColumns?.columnsTable}
    >
      <Grid container direction="column">
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel component="legend">lat/lon</FormLabel>
            <RadioGroup value={coordsType} onChange={handleCoordsTypeChange}>
              <FormControlLabel
                value="FLOAT"
                control={<Radio />}
                label="lat/lon"
              />
              <FormControlLabel
                value="GEOGRAPHY"
                control={<Radio />}
                label="geography"
              />
              <Select
                className={classes.selector}
                variant="outlined"
                value={coordsColumn}
                onChange={handleCoordsColumnChange}
              >
                {coordsType && getMenuItems(coordsType)}
              </Select>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel component="legend">Timestamp</FormLabel>
            <Select
              className={classes.selector}
              variant="outlined"
              value={timestampColumn}
              onChange={handleTimestampColumnChange}
            >
              {getMenuItems('TIMESTAMP')}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </TableOverlay>
  );
};

export default IngestionOptionsPage;
