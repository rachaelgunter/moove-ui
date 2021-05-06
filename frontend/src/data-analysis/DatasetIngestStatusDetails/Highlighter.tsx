import React, { FC } from 'react';
import { Theme, makeStyles, Box } from '@material-ui/core';

import { DatasetIngestStatus } from '../types';

interface HighlighterProps {
  status: DatasetIngestStatus;
}

const useStyles = (status: DatasetIngestStatus) =>
  makeStyles((theme: Theme) => {
    const colorMap = {
      [DatasetIngestStatus.ACTIVE]: theme.palette.positive,
      [DatasetIngestStatus.PROCESSING]: theme.palette.notice,
      [DatasetIngestStatus.FAILED]: theme.palette.error.light,
    };

    return {
      root: {
        color: colorMap[status],
      },
    };
  })();

const Highlighter: FC<HighlighterProps> = ({ status }: HighlighterProps) => {
  const classes = useStyles(status);

  return (
    <Box className={classes.root} component="span">
      {status}
    </Box>
  );
};

export default Highlighter;
