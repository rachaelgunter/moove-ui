import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';

interface PageTitleProps {
  title: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.bg.light,
    padding: theme.spacing(2, 4),
    height: 60,
  },
}));

const PageTitle: React.FC<PageTitleProps> = ({ title }: PageTitleProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body2">{title}</Typography>
    </div>
  );
};

export default PageTitle;
