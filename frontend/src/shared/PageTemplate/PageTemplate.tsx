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
    width: '100%',
  },
});

const PageTemplate: React.FC<PageTemplateProps> = ({
  children,
  title,
}: PageTemplateProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PageTitle title={title} />
      <PageContent>{children}</PageContent>
    </div>
  );
};

export default PageTemplate;
