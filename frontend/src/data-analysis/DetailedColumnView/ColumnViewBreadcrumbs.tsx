import React, { FC } from 'react';

import { Breadcrumbs, makeStyles, Theme, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

interface ColumnViewBreadcrumbsProps {
  datasetName: string;
  columnName: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  breadcrumbs: {
    paddingLeft: '18px',
  },
  breadcrumbsItem: {
    lineHeight: '39px',
  },
}));

const ColumnViewBreadcrumbs: FC<ColumnViewBreadcrumbsProps> = ({
  datasetName,
  columnName,
}: ColumnViewBreadcrumbsProps) => {
  const classes = useStyles();

  return (
    <Breadcrumbs
      className={classes.breadcrumbs}
      separator={<NavigateNextIcon fontSize="small" />}
    >
      <Typography className={classes.breadcrumbsItem}>{datasetName}</Typography>
      <Typography className={classes.breadcrumbsItem} color="textPrimary">
        {columnName}
      </Typography>
    </Breadcrumbs>
  );
};

export default ColumnViewBreadcrumbs;
