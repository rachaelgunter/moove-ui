import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';

export type ColumnProperty = Record<string, string | number>;

interface ColumnPropertiesListProps {
  columnProperties: ColumnProperty[];
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
  columnProperties,
}: ColumnPropertiesListProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.columnPropertiesList}>
      {columnProperties.map((property) => {
        const key = Object.keys(property)[0];
        const value = Object.values(property)[0];

        return (
          <Box key={key} className={classes.columnPropetry}>
            <Box>{key}</Box>
            <Box>{value}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ColumnPropertiesList;
