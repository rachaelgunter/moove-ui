import React from 'react';
import { Chip, makeStyles, Theme } from '@material-ui/core';

import { DatasetStatus } from 'src/data-analysis/types';
import { FontFamily } from 'src/app/styles/fonts';

interface StatusChipProps {
  status: DatasetStatus;
}

interface StyleProps {
  isProcessing: boolean;
}

const useStyles = makeStyles<Theme, StyleProps, string>((theme: Theme) => ({
  root: ({ isProcessing }: StyleProps) => ({
    background: isProcessing ? theme.palette.notice : theme.palette.positive,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(12),
    borderRadius: 8,
    width: 96,
    fontFamily: FontFamily.ROBOTO,
  }),
}));

const StatusChip: React.FC<StatusChipProps> = ({ status }: StatusChipProps) => {
  const isProcessing = status === DatasetStatus.PROCESSING;

  const classes = useStyles({ isProcessing });
  const label = isProcessing ? 'Processing' : 'Active';

  return <Chip label={label} size="small" className={classes.root} />;
};

export default StatusChip;
