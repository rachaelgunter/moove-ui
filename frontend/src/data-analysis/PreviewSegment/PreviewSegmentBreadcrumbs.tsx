import React, { FC } from 'react';

import { Breadcrumbs, makeStyles, Theme, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

interface PreviewSegmentBreadcrumbsProps {
  segment: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  breadcrumbs: {
    paddingLeft: '18px',
  },
  breadcrumbsItem: {
    lineHeight: '39px',
  },
}));

const PreviewSegmentBreadcrumbs: FC<PreviewSegmentBreadcrumbsProps> = ({
  segment,
}: PreviewSegmentBreadcrumbsProps) => {
  const classes = useStyles();

  return (
    <Breadcrumbs
      className={classes.breadcrumbs}
      separator={<NavigateNextIcon fontSize="small" />}
    >
      <Typography className={classes.breadcrumbsItem} color="textPrimary">
        {segment}
      </Typography>
    </Breadcrumbs>
  );
};

export default PreviewSegmentBreadcrumbs;
