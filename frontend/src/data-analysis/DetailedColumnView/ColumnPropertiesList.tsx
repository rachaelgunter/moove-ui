import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { ColumnModel } from '../types';

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

  return (
    <Box className={classes.columnPropertiesList}>
      {Object.keys(column).map((key) => {
        return (
          <Box key={key} className={classes.columnPropetry}>
            <Box>{key}</Box>
            <Box>{column[key]}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ColumnPropertiesList;
