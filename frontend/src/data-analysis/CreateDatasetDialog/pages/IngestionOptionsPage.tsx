import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import { BIG_QUERY_TABLE_COLUMNS_QUERY } from 'src/data-analysis/queries';
import TableOverlay from 'src/shared/TableOverlay/TableOverlay';
import { ColumnData } from 'src/data-analysis/types';
import Selector from 'src/shared/Selector';
import CreateDatasetContext from '../CreateDatasetContext';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
  },
}));

type LatLonData = {
  lat: string;
  lon: string;
};

const ADMIN_AREAS = [
  'adminarea_0',
  'adminarea_1',
  'adminarea_2',
  'adminarea_3',
];

const IngestionOptionsPage: React.FC = () => {
  const classes = useStyles();

  const { selectedTable } = useContext(CreateDatasetContext);
  const { data: columnsData, loading: columnsLoading, error } = useQuery(
    BIG_QUERY_TABLE_COLUMNS_QUERY,
    {
      variables: {
        projectId: selectedTable?.projectId,
        datasetId: selectedTable?.datasetId,
        tableId: selectedTable?.tableId,
      },
    },
  );

  const [coordsType, setCoordsType] = useState<string | null>(null);
  const [geographyColumn, setGeographyColumn] = useState<string>('');
  const [latLongColumns, setLatLongColumns] = useState<LatLonData>(
    {} as LatLonData,
  );
  const [timestampColumn, setTimestampColumn] = useState<string>('');
  const [groupByColumn, setGroupByColumn] = useState<string>('');
  const [jenkColsColumns, setJenkColsColumns] = useState<Array<string>>([]);

  const handleCoordsTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCoordsType(event.target.value);
  };

  const handleGeographyColumnChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setGeographyColumn(event.target.value as string);
  };

  const handleLatLongColumnChange = (
    field: keyof LatLonData,
    value: string,
  ) => {
    setLatLongColumns((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimestampColumnChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setTimestampColumn(event.target.value as string);
  };

  const handleGroupByColumnChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setGroupByColumn(event.target.value as string);
  };

  const handleJenkColsColumnsChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setJenkColsColumns(event.target.value as Array<string>);
  };

  const createMenuItem = (name: string) => (
    <MenuItem key={name} value={name}>
      {name}
    </MenuItem>
  );

  const getMenuItems = (columnType: string): Array<string> => {
    return columnsData?.tableColumns
      ?.filter(({ type }: ColumnData) =>
        columnType ? type === columnType : true,
      )
      .map(({ name }: ColumnData) => createMenuItem(name));
  };

  const LatLonForm = () => {
    const FloatSelectors = () => {
      const menuItems = coordsType && getMenuItems(coordsType);

      return (
        <>
          <Selector
            label="Latitude"
            value={latLongColumns.lat}
            onChange={(event) =>
              handleLatLongColumnChange('lat', event.target.value as string)
            }
          >
            {menuItems}
          </Selector>
          <Selector
            label="Longitude"
            value={latLongColumns.lon}
            onChange={(event) =>
              handleLatLongColumnChange('lon', event.target.value as string)
            }
          >
            {menuItems}
          </Selector>
        </>
      );
    };

    const GeographySelector = () => (
      <Selector
        label="Geography"
        value={geographyColumn}
        onChange={handleGeographyColumnChange}
      >
        {coordsType && getMenuItems(coordsType)}
      </Selector>
    );

    const SelectorComponent =
      coordsType === 'FLOAT' ? FloatSelectors : GeographySelector;

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">lat/lon</FormLabel>
        <RadioGroup value={coordsType} onChange={handleCoordsTypeChange}>
          <FormControlLabel value="FLOAT" control={<Radio />} label="lat/lon" />
          <FormControlLabel
            value="GEOGRAPHY"
            control={<Radio />}
            label="geography"
          />
        </RadioGroup>
        <SelectorComponent />
      </FormControl>
    );
  };

  return (
    <div className={classes.root}>
      <TableOverlay
        loading={columnsLoading}
        error={!!error}
        data={columnsData?.tableColumns}
      >
        <Grid container direction="column">
          <Grid item>
            <LatLonForm />
          </Grid>
          <Divider />
          <Grid item>
            <FormLabel component="legend">Timestamp</FormLabel>
            <Selector
              label="Timestamp"
              value={timestampColumn}
              onChange={handleTimestampColumnChange}
            >
              {getMenuItems('TIMESTAMP')}
            </Selector>
          </Grid>
          <Divider />
          <Grid item>
            <FormLabel component="legend">Groupby col</FormLabel>
            <Selector
              label="Groupby col"
              value={groupByColumn}
              onChange={handleGroupByColumnChange}
            >
              {ADMIN_AREAS.map(createMenuItem)}
            </Selector>
          </Grid>
          <Divider />
          <Grid item>
            <FormLabel component="legend">Jenks cols</FormLabel>
            <Selector
              multiple
              label="Jenks cols"
              value={jenkColsColumns}
              onChange={handleJenkColsColumnsChange}
              input={<Input />}
            >
              {getMenuItems('')}
            </Selector>
          </Grid>
        </Grid>
      </TableOverlay>
    </div>
  );
};

export default IngestionOptionsPage;
