import React, { FC, useContext } from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';

import AuthPage from './AuthPage';
import Footer from './Footer';
import SignUpForm from './SignUpForm';
import Link from './Link';
import TermsProvider from './TermsProvider';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  termsPrompt: {
    marginBottom: theme.spacing(2),
  },
}));

const SignUp: FC = () => {
  const classes = useStyles();
  const { termsAccepted } = useContext(TermsProvider);

  return (
    <AuthPage>
      {!termsAccepted && (
        <Typography
          classes={{ root: classes.termsPrompt }}
          variant="body2"
          component="p"
        >
          You must accept our{' '}
          <Link href="/terms" variant="body2">
            Terms
          </Link>{' '}
          before signing up&nbsp;
        </Typography>
      )}
      <SignUpForm />
      <Footer>
        <Typography classes={classes} variant="body2" component="p">
          Already have an account?&nbsp;
          <Link href="/" variant="body2">
            Sign In
          </Link>
        </Typography>
        <Typography variant="body2" component="p">
          By signing up, you agree to our&nbsp;
          <Link href="/terms" variant="body2">
            terms
          </Link>
        </Typography>
      </Footer>
    </AuthPage>
  );
};

export default SignUp;
