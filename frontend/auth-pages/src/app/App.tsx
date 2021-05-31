import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { FC } from 'react';
import { Switch, Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { AuthOptions, WebAuth } from 'auth0-js';
import { ApolloClient, ApolloProvider } from '@apollo/client';

import SignUpStateProvider from '../SignUpForm/SignUpFormContext';
import EmailVerification from '../EmailVerification';
import WebAuthProvider from '../WebAuthProvider';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Terms from '../Terms';
import theme from './styles';
import ForgotPassword from '../ForgotPassword';

interface AppProps {
  webAuth: WebAuth;
  options: AuthOptions;
  apolloClient: ApolloClient<any>;
}

const App: FC<AppProps> = ({ webAuth, options, apolloClient }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WebAuthProvider.Provider value={{ webAuth, options }}>
        <SignUpStateProvider>
          <ApolloProvider client={apolloClient}>
            <HashRouter>
              <Switch>
                <Route exact path="/premium">
                  <SignIn hasGoogleAuth />
                </Route>
                <Route exact path="/">
                  <SignIn />
                </Route>
                <Route path="/sign-up">
                  <SignUp />
                </Route>
                <Route path="/terms">
                  <Terms />
                </Route>
                <Route path="/verification">
                  <EmailVerification />
                </Route>
                <Route exact path="/forgot-password">
                  <ForgotPassword />
                </Route>
              </Switch>
            </HashRouter>
          </ApolloProvider>
        </SignUpStateProvider>
      </WebAuthProvider.Provider>
    </ThemeProvider>
  );
};

export default App;
