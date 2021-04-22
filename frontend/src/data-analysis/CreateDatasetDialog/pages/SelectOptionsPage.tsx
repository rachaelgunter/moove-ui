import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  Box,
  CircularProgress,
  FormLabel,
  Grid,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

import { BIG_QUERY_TABLE_COLUMNS_QUERY } from 'src/data-analysis/queries';
import Selector from 'src/shared/Selector';
import { ColumnType } from 'src/data-analysis/types';
import LatLonSelector from '../LatLonSelector';
import { getColumnNamesByType } from '../utils';
import CreateDatasetContext from '../CreateDatasetContext';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    marginBottom: theme.spacing(1),
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flex: '1 1 auto',
    display: 'flex',
    minHeight: 492,
  },
}));

const ADMIN_AREAS = [
  'adminarea_0',
  'adminarea_1',
  'adminarea_2',
  'adminarea_3',
];

const SelectOptionsPage: React.FC = () => {
  const classes = useStyles();

  const [timestampError, setTimestampError] = useState(false);
  const [groupByError, setGroupByError] = useState(false);
  const [jenkColsError, setJenkColsError] = useState(false);
  const {
    selectedTable,
    latLonColumns,
    geographyColumn,
    timestampColumn,
    groupByColumn,
    jenkColsColumns,
    handleTimestampColumnChange,
    handleGroupByColumnChange,
    handleJenkColsColumnsChange,
    handleErrorStatusChange,
  } = useContext(CreateDatasetContext);
  const [
    getColumnsData,
    { data: columnsData, loading: columnsLoading },
  ] = useLazyQuery(BIG_QUERY_TABLE_COLUMNS_QUERY);

  useEffect(() => {
    if (!selectedTable) {
      return;
    }

    getColumnsData({
      variables: {
        projectId: selectedTable?.projectId,
        datasetId: selectedTable?.datasetId,
        tableId: selectedTable?.tableId,
      },
    });
  }, [getColumnsData, selectedTable]);

  useEffect(() => {
    handleErrorStatusChange(
      Boolean(
        ((!latLonColumns.lat || !latLonColumns.lon) && !geographyColumn) ||
          !timestampColumn ||
          !groupByColumn ||
          !jenkColsColumns.length,
      ),
    );
  }, [
    latLonColumns,
    geographyColumn,
    handleErrorStatusChange,
    timestampColumn,
    groupByColumn,
    jenkColsColumns.length,
  ]);

  const onTimestampColumnChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    handleTimestampColumnChange(event.target.value as string);
  };
  const onTimestampBlur = () => {
    setTimestampError(!timestampColumn);
  };
  const onGroupByColumnChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    handleGroupByColumnChange(event.target.value as string);
  };
  const onGroupByBlur = () => {
    setGroupByError(!groupByColumn);
  };
  const onJenkColsColumnsChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    handleJenkColsColumnsChange(event.target.value as Array<string>);
  };
  const onJenkColsBlur = () => {
    setJenkColsError(!jenkColsColumns.length);
  };

  const tableColumns = columnsData?.tableColumns || [];
  const selectors = [
    {
      label: 'Timestamp',
      value: timestampColumn,
      onChange: onTimestampColumnChange,
      onBlur: onTimestampBlur,
      menuItems: getColumnNamesByType(tableColumns, ColumnType.TIMESTAMP),
      required: true,
      error: timestampError,
      'data-testid': 'SelectOptionsPage__timestamp',
    },
    {
      label: 'Groupby col',
      value: groupByColumn,
      onChange: onGroupByColumnChange,
      onBlur: onGroupByBlur,
      menuItems: ADMIN_AREAS,
      required: true,
      error: groupByError,
    },
    {
      label: 'Jenks cols',
      value: jenkColsColumns,
      onChange: onJenkColsColumnsChange,
      onBlur: onJenkColsBlur,
      menuItems: getColumnNamesByType(tableColumns, ''),
      multiple: true,
      required: true,
      error: jenkColsError,
    },
  ];

  if (columnsLoading) {
    return (
      <Box className={classes.overlay}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <LatLonSelector tableColumns={tableColumns} />
      </Grid>
      {tableColumns &&
        selectors.map(
          ({
            label,
            menuItems,
            required,
            error: fieldError,
            ...selectorProps
          }) => (
            <Grid item key={label}>
              <FormLabel
                component="legend"
                className={classes.label}
                required={required}
                error={fieldError}
              >
                {label}
              </FormLabel>
              <Selector error={fieldError} {...selectorProps}>
                {menuItems.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Selector>
            </Grid>
          ),
        )}
    </Grid>
  );
};

export default SelectOptionsPage;
