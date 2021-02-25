import React, { ReactElement } from 'react';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import backgroundMap1x from 'src/assets/images/background-map.jpg';
import backgroundMap2x from 'src/assets/images/background-map@2x.jpg';
import backgroundMap3x from 'src/assets/images/background-map@3x.jpg';
import Header from '../Header';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#5291a8',
    backgroundSize: 'cover',
    display: 'flex',
    minHeight: '100vh',
    flexGrow: 1,
  },
  backgroundMap: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 0,
  },
  card: {
    backgroundColor: 'transparent',
    maxWidth: 423,
    width: '100%',
  },
  content: {
    backgroundColor: theme.palette.bg.dark,
    zIndex: 1,
    position: 'relative',
    padding: theme.spacing(3.5, 6),
  },
}));

interface AuthPageProps {
  children: ReactElement[];
}

const AuthPage = ({ children }: AuthPageProps): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        className={classes.backgroundMap}
        alt="background map"
        src={backgroundMap1x}
        srcSet={`${backgroundMap2x} 2x, ${backgroundMap3x} 3x`}
      />
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Card className={classes.card}>
            <CardHeader component={Header} />
            <CardContent className={classes.content}>{children}</CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthPage;
