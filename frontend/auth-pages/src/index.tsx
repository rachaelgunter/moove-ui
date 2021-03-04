import { CssBaseline, ThemeProvider } from '@material-ui/core';
import auth0 from 'auth0-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import theme from './app/styles';
import SignIn from './SignIn';
import SignUp from './SignUp';
import WebAuthProvider from './WebAuthProvider';

function getAuthOptions() {
  const config = JSON.parse(
    decodeURIComponent(escape(window.atob('@@config@@'))),
  );

  const { leeway } = config.internalOptions;
  if (leeway) {
    const convertedLeeway = parseInt(leeway, 10);

    if (!isNaN(convertedLeeway)) {
      config.internalOptions.leeway = convertedLeeway;
    }
  }

  // eslint-disable-next-line no-console
  console.log(config);

  return {
    overrides: {
      __tenant: config.auth0Tenant,
      __token_issuer: config.authorizationServer.issuer,
    },
    domain: config.auth0Domain,
    clientID: config.clientID,
    redirectUri: config.callbackURL,
    responseType: 'code',
    scope: 'openid profile email offline_access',
    ...config.internalOptions,
  };
}

/**
 * This can be used for local development purposes only.
 * In order to test actual sign-in/sign-up, the app needs to
 * be deployed to auth0
 */
const devOptions: auth0.AuthOptions = {
  overrides: {
    __tenant: 'config.auth0Tenant',
    __token_issuer: 'config.authorizationServer.issuer',
  },
  domain: 'config.auth0Domain',
  clientID: 'config.clientID',
  redirectUri: 'config.callbackURL',
  responseType: 'code',
};

const options =
  process.env.NODE_ENV === 'development' ? devOptions : getAuthOptions();

const webAuth = new auth0.WebAuth(options);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <WebAuthProvider.Provider value={{ webAuth, options }}>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
        </Switch>
      </HashRouter>
    </WebAuthProvider.Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);
