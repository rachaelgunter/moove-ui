import {
  Button,
  createStyles,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { FC, useContext } from 'react';
import WebAuthProvider from '../WebAuthProvider';
import Image from '../assets/icons/google-icon.svg';

interface GoogleAuthProps {
  hint: string;
  buttonText: string;
}

const GoogleAuthButton = withStyles({
  root: {
    width: '100%',
    background: '#fff',
    color: '#000',
    textTransform: 'none',
    padding: '16px 0',
    borderRadius: '10px',
    fontSize: 16,

    '&:hover': {
      background: '#fff',
    },
  },
})(Button);

const useStyles = makeStyles(() =>
  createStyles({
    hint: {
      marginBottom: '19px',
      fontWeight: 500,
    },
    secondaryHint: {
      margin: '19px 0 14px 0',
      color: '#a0b3b2',
      fontWeight: 500,
    },
    googleIcon: {
      marginRight: '22px',
    },
  }),
);

const GoogleAuth: FC<GoogleAuthProps> = ({
  hint,
  buttonText,
}: GoogleAuthProps) => {
  const { webAuth } = useContext(WebAuthProvider);
  const classes = useStyles();

  const signInWithGoogle = () => {
    webAuth.authorize({
      connection: 'google-oauth2',
      accessType: 'offline',
      connection_scope: [
        'https://www.googleapis.com/auth/bigquery.readonly',
        'https://www.googleapis.com/auth/devstorage.read_only',
      ],
      approvalPrompt: 'consent',
      state: undefined,
    });
  };

  return (
    <>
      <Typography className={classes.hint} align="center">
        {hint}
      </Typography>
      <GoogleAuthButton onClick={signInWithGoogle}>
        <Image className={classes.googleIcon} width="20px" height="20px" />
        {buttonText}
      </GoogleAuthButton>
      <Typography
        className={classes.secondaryHint}
        variant="body2"
        align="center"
      >
        OR
      </Typography>
    </>
  );
};

export default GoogleAuth;
