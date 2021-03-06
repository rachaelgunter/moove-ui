import React, { FC, useContext } from 'react';
import { Box, CircularProgress, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { UserContext } from 'src/auth/UserProvider';
import ColumnViewCharts from './ColumnViewCharts';

interface ColumnViewContentProps {
  sections: {
    title: string;
    chartsUrls?: [];
  }[];
}

export const useColumnViewContentStyles = makeStyles((theme: Theme) => ({
  gridItem: {
    height: '100%',
    paddingRight: theme.spacing(1.5),

    '&:last-child': {
      paddingRight: 0,
    },
  },
  sectionContainer: {
    background: theme.palette.bg.dark,
    height: '100%',
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1.25),
    overflow: 'hidden',
  },
  sectionTitle: {
    marginBottom: theme.spacing(1.25),
  },
  sectionContent: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    marginRight: -10,
  },
  spinner: {
    alignSelf: 'center',
    margin: '0 auto',
  },
}));

const ColumnViewContent: FC<ColumnViewContentProps> = ({
  sections,
}: ColumnViewContentProps) => {
  const classes = useColumnViewContentStyles();
  const user = useContext(UserContext);

  return (
    <Grid className={classes.gridItem} item xs>
      <Box className={classes.sectionContainer}>
        {sections.map(({ title, chartsUrls }) => (
          <>
            <Box className={classes.sectionTitle} key={`section-${title}`}>
              {title}
            </Box>
            <Box
              className={classes.sectionContent}
              key={`section-content-${title}`}
            >
              {chartsUrls ? (
                <ColumnViewCharts chartsUrls={chartsUrls} user={user} />
              ) : (
                <CircularProgress className={classes.spinner} />
              )}
            </Box>
          </>
        ))}
      </Box>
    </Grid>
  );
};

export default ColumnViewContent;
