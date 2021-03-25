import React from 'react';
import { Chip, makeStyles, Theme } from '@material-ui/core';

import { DatasetStatus } from 'src/data-analysis/types';
import { FontFamily } from 'src/app/styles/fonts';
import theme from 'src/app/styles';

interface StatusChipProps {
  status: DatasetStatus;
}

interface StatusChipUI {
  statusLabel: string;
  statusColor: string;
}

interface StyleProps {
  statusColor: string;
}

const useStyles = makeStyles<Theme, StyleProps, string>(() => ({
  root: ({ statusColor }: StyleProps) => ({
    background: statusColor,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(12),
    borderRadius: 8,
    width: 96,
    fontFamily: FontFamily.ROBOTO,
  }),
}));

const StatusChip: React.FC<StatusChipProps> = ({ status }: StatusChipProps) => {
  const uiStatusesMap: { [key in DatasetStatus]: StatusChipUI } = {
    [DatasetStatus.ACTIVE]: {
      statusLabel: 'Active',
      statusColor: theme.palette.positive,
    },
    [DatasetStatus.PROCESSING]: {
      statusLabel: 'Processing',
      statusColor: theme.palette.notice,
    },
    [DatasetStatus.FAILED]: {
      statusLabel: 'Failed',
      statusColor: theme.palette.error.light,
    },
  };

  const statusUI = uiStatusesMap[status];
  const classes = useStyles({ statusColor: statusUI.statusColor });
  const label = statusUI.statusLabel;

  return <Chip label={label} size="small" className={classes.root} />;
};

export default StatusChip;
