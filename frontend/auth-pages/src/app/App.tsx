import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { FC } from 'react';
import { Switch, Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { AuthOptions, WebAuth } from 'auth0-js';
import SignUpStateProvider from '../SignUpForm/SignUpFormContext';
import EmailVerification from '../EmailVerification';
import WebAuthProvider from '../WebAuthProvider';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Terms from '../Terms';
import theme from './styles';

interface AppProps {
  webAuth: WebAuth;
  options: AuthOptions;
}

const App: FC<AppProps> = ({ webAuth, options }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WebAuthProvider.Provider value={{ webAuth, options }}>
        <SignUpStateProvider>
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
            </Switch>
          </HashRouter>
        </SignUpStateProvider>
      </WebAuthProvider.Provider>
    </ThemeProvider>
  );
};

export default App;
