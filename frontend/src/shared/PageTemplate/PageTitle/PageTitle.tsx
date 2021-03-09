import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';

interface PageTitleProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.bg.light,
    padding: theme.spacing(2, 4),
    height: 60,
  },
}));

const PageTitle: React.FC<PageTitleProps> = ({ children }: PageTitleProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="page-title">
      <Typography variant="body1">{children}</Typography>
    </div>
  );
};

export default PageTitle;
