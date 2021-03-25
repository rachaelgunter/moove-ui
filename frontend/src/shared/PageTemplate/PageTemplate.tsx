import React from 'react';
import { makeStyles } from '@material-ui/core';

import PageTitle from './PageTitle';
import PageContent from './PageContent';

interface PageTemplateProps {
  children: React.ReactNode;
  title: string;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 256px)',
    flex: '1 0 auto',
  },
});

const PageTemplate: React.FC<PageTemplateProps> = ({
  children,
  title,
}: PageTemplateProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PageTitle>{title}</PageTitle>
      <PageContent>{children}</PageContent>
    </div>
  );
};

export default PageTemplate;
