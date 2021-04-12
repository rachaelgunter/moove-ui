import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, makeStyles, Theme } from '@material-ui/core';

import AuthPage from './AuthPage';
import SubmitButton from './SubmitButton';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightMedium,
  },
  description: {
    fontWeight: theme.typography.fontWeightLight,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));

const EmailVerification: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const onBackClick = () => {
    history.push('/');
  };

  return (
    <AuthPage>
      <Typography
        display="block"
        variant="body1"
        align="center"
        className={classes.title}
      >
        Email sent!
      </Typography>
      <Typography
        display="block"
        variant="body2"
        className={classes.description}
      >
        We have sent a verification link to your email address. Please verify
        your account before signing in.
      </Typography>
      <SubmitButton onClick={onBackClick}>Back to login</SubmitButton>
    </AuthPage>
  );
};

export default EmailVerification;
