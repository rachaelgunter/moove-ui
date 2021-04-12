import React, { ReactElement, ReactNode } from 'react';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Header from '../Header';
import {
  backgroundMap1x,
  backgroundMap2x,
  backgroundMap3x,
} from '../constants';

interface AuthPageStyleProps {
  size: 'small' | 'large';
}

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
  card: ({ size }: AuthPageStyleProps) => ({
    backgroundColor: 'transparent',
    width: size === 'small' ? 423 : 870,
    maxWidth: '100%',
  }),
  content: {
    backgroundColor: theme.palette.bg.dark,
    zIndex: 1,
    position: 'relative',
    padding: theme.spacing(3.5, 6),
  },
}));

interface AuthPageProps {
  children: ReactNode;
  size?: 'small' | 'large';
}

const AuthPage = ({
  children,
  size = 'small',
}: AuthPageProps): ReactElement => {
  const classes = useStyles({ size });

  return (
    <div className={classes.root}>
      <img
        className={classes.backgroundMap}
        alt="background map"
        src={backgroundMap1x}
        srcSet={`${backgroundMap2x} 2x, ${backgroundMap3x} 3x`}
      />
      <Grid container item justify="center" alignItems="center">
        <Card className={classes.card}>
          <CardHeader component={Header} />
          <CardContent className={classes.content}>{children}</CardContent>
        </Card>
      </Grid>
    </div>
  );
};

AuthPage.defaultProps = {
  size: 'small',
};

export default AuthPage;
