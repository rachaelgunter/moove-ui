import React, { useContext, useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import Selector from 'src/shared/Selector';
import { ColumnData, ColumnType } from 'src/data-analysis/types';
import CreateDatasetContext, { LatLonData } from '../CreateDatasetContext';
import { getColumnNamesByType } from '../utils';

interface LatLonSelectorProps {
  tableColumns: ColumnData[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  label: {
    marginBottom: theme.spacing(1),
  },
  radioButton: {
    marginBottom: theme.spacing(1),
  },
}));

const LatLonSelector: React.FC<LatLonSelectorProps> = ({
  tableColumns,
}: LatLonSelectorProps) => {
  const classes = useStyles();

  const [coordsType, setCoordsType] = useState<ColumnType>(ColumnType.FLOAT);
  const [latLonError, setLatLonError] = useState<{ lat: false; lon: false }>({
    lat: false,
    lon: false,
  });
  const [geographyError, setGeographyError] = useState(false);

  const { state, dispatch } = useContext(CreateDatasetContext);

  const onCoordsTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newCoordsType = event.target.value as ColumnType;
    setCoordsType(newCoordsType);

    if (newCoordsType === ColumnType.FLOAT) {
      dispatch({
        geographyColumn: '',
      });
      setGeographyError(false);
    } else {
      dispatch({
        latLonColumns: {
          lat: '',
          lon: '',
        },
      });
      setLatLonError({
        lat: false,
        lon: false,
      });
    }
  };
  const onLatLongColumnChange = (field: keyof LatLonData, value: string) => {
    dispatch({
      latLonColumns: {
        ...state.latLonColumns,
        [field]: value,
      },
    });
  };
  const onGeographyColumnChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    dispatch({
      geographyColumn: event.target.value as string,
    });
  };
  const onLatLongBlur = (field: keyof LatLonData) => {
    setLatLonError((prev) => ({
      ...prev,
      [field]: !state.latLonColumns[field],
    }));
  };
  const onGeographyBlur = () => {
    setGeographyError(!state.geographyColumn);
  };

  const columnNames = getColumnNamesByType(tableColumns, coordsType);
  const selectors =
    coordsType === ColumnType.FLOAT
      ? [
          {
            label: 'Latitude',
            value: state.latLonColumns.lat,
            error: latLonError.lat,
            'data-testid': 'LatLonSelector__lat',
            onChange: (event: React.ChangeEvent<{ value: unknown }>) =>
              onLatLongColumnChange('lat', event.target.value as string),
            onBlur: () => onLatLongBlur('lat'),
          },
          {
            label: 'Longitude',
            value: state.latLonColumns.lon,
            error: latLonError.lon,
            'data-testid': 'LatLonSelector__lon',
            onChange: (event: React.ChangeEvent<{ value: unknown }>) =>
              onLatLongColumnChange('lon', event.target.value as string),
            onBlur: () => onLatLongBlur('lon'),
          },
        ]
      : [
          {
            label: 'Geography',
            value: state.geographyColumn,
            error: geographyError,
            'data-testid': 'LatLonSelector__geography',
            onChange: onGeographyColumnChange,
            onBlur: onGeographyBlur,
          },
        ];

  return (
    <FormControl
      component="fieldset"
      className={classes.root}
      required
      error={geographyError || latLonError.lat || latLonError.lon}
    >
      <FormLabel component="legend" className={classes.label}>
        lat/lon
      </FormLabel>
      <RadioGroup
        className={classes.radioButton}
        value={coordsType}
        onChange={onCoordsTypeChange}
      >
        <FormControlLabel
          value={ColumnType.FLOAT}
          control={<Radio />}
          label="lat/lon"
        />
        <FormControlLabel
          value={ColumnType.GEOGRAPHY}
          control={<Radio />}
          label="geography"
        />
      </RadioGroup>
      {selectors.map(({ label, ...otherProps }) => (
        <Selector required label={label} key={label} {...otherProps}>
          {columnNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Selector>
      ))}
    </FormControl>
  );
};

export default LatLonSelector;
