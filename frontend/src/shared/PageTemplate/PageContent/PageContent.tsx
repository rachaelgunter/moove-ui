import React from 'react';
import { makeStyles, Paper, Theme } from '@material-ui/core';

interface PageContentProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.bg.dark,
    padding: theme.spacing(5, 4),
    height: '100%',
  },
}));

const PageContent: React.FC<PageContentProps> = ({
  children,
}: PageContentProps) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} square className={classes.root}>
      {children}
    </Paper>
  );
};

export default PageContent;
