import React, { FC, ReactElement } from 'react';
import { Card, CardHeader, Grid, Link, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Logo from '../assets/logo/galileo-logo-medium.svg';

export const backgroundMap1x =
  'https://storage.googleapis.com/unified-ui-auth-static-assets/background-map.jpg';
export const backgroundMap2x =
  'https://storage.googleapis.com/unified-ui-auth-static-assets/background-map%402x.jpg';
export const backgroundMap3x =
  'https://storage.googleapis.com/unified-ui-auth-static-assets/background-map%403x.jpg';

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
    width: 423,
    maxWidth: '100%',
  },
  content: {
    backgroundColor: theme.palette.bg.dark,
    zIndex: 1,
    position: 'relative',
    padding: theme.spacing(3.5, 6),
  },
  header: {
    backgroundColor: '#07131d',
    border: '1px solid #1b3e49',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 80,
    opacity: 0.8,
    position: 'relative',
    zIndex: 1,
  },
}));

interface ErrorPageProps {
  error: string;
}

const ErrorPage = ({ error }: ErrorPageProps): ReactElement => {
  const classes = useStyles();
  const logoutURL = `//${process.env.REACT_APP_AUTH0_DOMAIN}/v2/logout?returnTo=${process.env.REACT_APP_AUTH0_LOGOUT_REDIRECT_URI}&client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}`;

  const Header: FC = () => {
    return (
      <Grid
        classes={{ root: classes.header }}
        container
        item
        justify="center"
        alignItems="center"
      >
        <img src={Logo} width="139px" height="24px" alt="" />
      </Grid>
    );
  };

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
          <div className={classes.content}>
            <Typography variant="body2" align="center">
              {error}
            </Typography>
            <Typography variant="body2" align="center">
              Return to <Link href={logoutURL}>login</Link>
            </Typography>
          </div>
        </Card>
      </Grid>
    </div>
  );
};

export default ErrorPage;
