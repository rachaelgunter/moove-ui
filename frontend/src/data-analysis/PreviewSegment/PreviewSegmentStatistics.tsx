import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { PreviewSegmentModelStatistic } from '../types';
import { FontFamily } from '../../app/styles/fonts';

interface PreviewSegmentStatisticsProps {
  statistics: PreviewSegmentModelStatistic[] | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    marginTop: '0px',
  },
  item: {
    display: 'flex',
    background: theme.palette.bg.light,
    justifyContent: 'space-between',
    borderRadius: theme.spacing(0.5),
    fontSize: 11,
    fontFamily: FontFamily.POPPINS,
    letterSpacing: 0.1,
    height: theme.spacing(4),
    alignItems: 'center',
    padding: '0 7px',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

export const PreviewSegmentStatistics: FC<PreviewSegmentStatisticsProps> = ({
  statistics,
}: PreviewSegmentStatisticsProps) => {
  const classes = useStyles();

  const processValue = (value: string | number) => {
    if (typeof value === 'number') {
      return Math.round((value + Number.EPSILON) * 1e6) / 1e6;
    }
    return value;
  };

  return (
    <Box className={classes.list}>
      {statistics &&
        statistics.map(({ name, value }) => {
          return (
            <Box key={name} className={classes.item}>
              <Box>{name}</Box>
              <Box>{processValue(value)}</Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default PreviewSegmentStatistics;
