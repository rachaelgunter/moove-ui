import React, { FC } from 'react';

import { Breadcrumbs, makeStyles, Theme, Typography } from '@material-ui/core';

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
  id: {
    color: 'rgba(255, 255, 255, 0.5)',
    opacity: '0.7',
  },
}));

const PreviewSegmentBreadcrumbs: FC<PreviewSegmentBreadcrumbsProps> = ({
  segment,
}: PreviewSegmentBreadcrumbsProps) => {
  const classes = useStyles();

  return (
    <Breadcrumbs className={classes.breadcrumbs} separator="">
      <Typography className={classes.id}>ID</Typography>
      <Typography className={classes.breadcrumbsItem} color="textPrimary">
        {segment}
      </Typography>
    </Breadcrumbs>
  );
};

export default PreviewSegmentBreadcrumbs;
