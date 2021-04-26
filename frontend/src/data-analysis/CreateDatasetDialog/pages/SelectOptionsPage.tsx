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

import {
  BIG_QUERY_TABLE_COLUMNS_QUERY,
  DATASET_FILE_UPLOAD_LINK_QUERY,
  DATASOURCE_VALIDATED_COLUMNS_QUERY,
} from 'src/data-analysis/queries';
import Selector from 'src/shared/Selector';
import { ColumnType } from 'src/data-analysis/types';
import { UserContext } from 'src/auth/UserProvider';
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

export const ADMIN_AREAS_MAP: { [key: string]: string } = {
  Country: 'adminarea_0',
  Province: 'adminarea_1',
  County: 'adminarea_2',
  'Postal Code': 'adminarea_3',
};

const SelectOptionsPage: React.FC = () => {
  const classes = useStyles();

  const [timestampError, setTimestampError] = useState(false);
  const [groupByError, setGroupByError] = useState(false);
  const [jenkColsError, setJenkColsError] = useState(false);
  const { state, dispatch } = useContext(CreateDatasetContext);
  const [
    getColumnsData,
    { data: bigQueryDatasourceColumnsData, loading: bigQueryColumnsLoading },
  ] = useLazyQuery(BIG_QUERY_TABLE_COLUMNS_QUERY);
  const [
    getCsvColumnData,
    { data: csvDatasourceColumnsData, loading: csvColumnsLoading },
  ] = useLazyQuery(DATASOURCE_VALIDATED_COLUMNS_QUERY, {
    fetchPolicy: 'no-cache',
  });

  const { organization } = useContext(UserContext);

  const [getUploadLink, { loading: linkLoading }] = useLazyQuery(
    DATASET_FILE_UPLOAD_LINK_QUERY,
    {
      fetchPolicy: 'no-cache',
      onCompleted: ({ datasetFileSignedUploadUrl }) =>
        uploadFile(datasetFileSignedUploadUrl).then(() =>
          getCsvColumnData({
            variables: {
              organizationName: organization,
              analysisName: state.name,
              fileName: state.selectedFile?.name,
            },
          }),
        ),
    },
  );

  const uploadFile = async (link: string) => {
    return fetch(link, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      method: 'PUT',
      body: state.selectedFile,
    });
  };

  useEffect(() => {
    if (!state.selectedTable) {
      return;
    }

    getColumnsData({
      variables: {
        projectId: state.selectedTable?.projectId,
        datasetId: state.selectedTable?.datasetId,
        tableId: state.selectedTable?.tableId,
      },
    });
  }, [getColumnsData, state.selectedTable]);

  useEffect(() => {
    if (!state.selectedFile) {
      return;
    }
    getUploadLink({
      variables: {
        fileName: state.selectedFile?.name ?? '',
        organizationName: organization,
        analysisName: state.name,
      },
    });
  }, [getUploadLink, organization, state.name, state.selectedFile]);

  useEffect(() => {
    dispatch({
      pageHaveError: Boolean(
        ((!state.latLonColumns.lat || !state.latLonColumns.lon) &&
          !state.geographyColumn) ||
          !state.timestampColumn ||
          !state.groupByColumn ||
          !state.jenkColsColumns.length,
      ),
    });
  }, [
    dispatch,
    state.geographyColumn,
    state.groupByColumn,
    state.jenkColsColumns.length,
    state.latLonColumns.lat,
    state.latLonColumns.lon,
    state.timestampColumn,
  ]);

  const onTimestampColumnChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    dispatch({
      timestampColumn: event.target.value as string,
    });
  };
  const onTimestampBlur = () => {
    setTimestampError(!state.timestampColumn);
  };
  const onGroupByColumnChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    dispatch({
      groupByColumn: event.target.value as string,
    });
  };
  const onGroupByBlur = () => {
    setGroupByError(!state.groupByColumn);
  };
  const onJenkColsColumnsChange = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    dispatch({
      jenkColsColumns: event.target.value as Array<string>,
    });
  };
  const onJenkColsBlur = () => {
    setJenkColsError(!state.jenkColsColumns.length);
  };

  const tableColumns =
    bigQueryDatasourceColumnsData?.tableColumns ||
    csvDatasourceColumnsData?.datasourceValidatedColumns ||
    [];
  const selectors = [
    {
      label: 'Timestamp',
      value: state.timestampColumn,
      onChange: onTimestampColumnChange,
      onBlur: onTimestampBlur,
      menuItems: getColumnNamesByType(tableColumns, ColumnType.TIMESTAMP),
      required: true,
      error: timestampError,
      'data-testid': 'SelectOptionsPage__timestamp',
    },
    {
      label: 'Groupby col',
      value: state.groupByColumn,
      onChange: onGroupByColumnChange,
      onBlur: onGroupByBlur,
      menuItems: Object.keys(ADMIN_AREAS_MAP),
      required: true,
      error: groupByError,
    },
    {
      label: 'Jenks cols',
      value: state.jenkColsColumns,
      onChange: onJenkColsColumnsChange,
      onBlur: onJenkColsBlur,
      menuItems: getColumnNamesByType(tableColumns, ''),
      multiple: true,
      required: true,
      error: jenkColsError,
    },
  ];

  if (bigQueryColumnsLoading || csvColumnsLoading || linkLoading) {
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
