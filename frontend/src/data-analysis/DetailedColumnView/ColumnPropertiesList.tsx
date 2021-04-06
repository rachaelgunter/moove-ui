import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { ColumnModel } from '../types';

enum ColumnProperties {
  NAME = 'name',
  TYPE = 'type',
  MIN = 'min',
  MAX = 'max',
  POPULATED = 'populated',
  AVERAGE = 'average',
  STDDEV = 'standardDeviation',
  VARIANCE = 'variance',
  COUNT = 'count',
  SUM = 'sum',
}

const columnPropertiesUI: { [key in ColumnProperties]: string } = {
  [ColumnProperties.NAME]: 'Name',
  [ColumnProperties.TYPE]: 'Type',
  [ColumnProperties.MIN]: 'Minimum',
  [ColumnProperties.MAX]: 'Maximum',
  [ColumnProperties.AVERAGE]: 'Average',
  [ColumnProperties.POPULATED]: 'Populated %',
  [ColumnProperties.STDDEV]: 'Standard Deviation',
  [ColumnProperties.COUNT]: 'Count',
  [ColumnProperties.SUM]: 'Sum',
  [ColumnProperties.VARIANCE]: 'Variance',
};

interface ColumnPropertiesListProps {
  column: ColumnModel;
}

const useStyles = makeStyles((theme: Theme) => ({
  columnPropertiesList: {
    marginTop: '10px',
  },
  columnPropetry: {
    display: 'flex',
    background: theme.palette.bg.light,
    justifyContent: 'space-between',
    borderRadius: theme.spacing(0.5),
    fontSize: 11,
    letterSpacing: 0.1,
    height: theme.spacing(4),
    alignItems: 'center',
    padding: '0 7px',
    marginBottom: '5px',
  },
}));

const ColumnPropertiesList: FC<ColumnPropertiesListProps> = ({
  column,
}: ColumnPropertiesListProps) => {
  const classes = useStyles();

  const processValue = (value: string | number) => {
    if (typeof value === 'number') {
      return Math.round((value + Number.EPSILON) * 1e6) / 1e6;
    }
    return value;
  };

  return (
    <Box className={classes.columnPropertiesList}>
      {Object.values(ColumnProperties).map((key: ColumnProperties) => {
        return (
          <Box key={key} className={classes.columnPropetry}>
            <Box>{columnPropertiesUI[key]}</Box>
            <Box>{processValue(column[key])}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ColumnPropertiesList;
