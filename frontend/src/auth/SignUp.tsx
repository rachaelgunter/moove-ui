import React, { FC } from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';

import routes from 'src/shared/routes';
import AuthPage from './AuthPage';
import Footer from './Footer';
import SignUpForm from './SignUpForm';
import Link from './Link';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

const SignIn: FC = () => {
  const classes = useStyles();

  return (
    <AuthPage>
      <SignUpForm />
      <Footer>
        <Typography classes={classes} variant="body2" component="p">
          Already have an account?&nbsp;
          <Link href={routes.signIn} variant="body2">
            Sign In
          </Link>
        </Typography>
        <Typography variant="body2" component="p">
          By signing up, you agree to our terms
        </Typography>
      </Footer>
    </AuthPage>
  );
};

export default SignIn;
