import React, { FC } from 'react';

import { Breadcrumbs, makeStyles, Theme, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme: Theme) => ({
  breadcrumbs: {
    paddingLeft: '18px',
  },
  breadcrumbsItem: {
    lineHeight: '39px',
  },
}));

const ColumnViewBreadcrumbs: FC = () => {
  const classes = useStyles();

  return (
    <Breadcrumbs
      className={classes.breadcrumbs}
      separator={<NavigateNextIcon fontSize="small" />}
    >
      <Typography className={classes.breadcrumbsItem}>Dataset Name</Typography>
      <Typography className={classes.breadcrumbsItem} color="textPrimary">
        Dataset Column
      </Typography>
    </Breadcrumbs>
  );
};

export default ColumnViewBreadcrumbs;
