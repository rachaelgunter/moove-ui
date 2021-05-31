import React from 'react';
import auth0 from 'auth0-js';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import App from './app/App';

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

  return {
    overrides: {
      __tenant: config.auth0Tenant,
      __token_issuer: config.authorizationServer.issuer,
    },
    domain: config.auth0Domain,
    clientID: config.clientID,
    redirectUri: config.callbackURL,
    responseType: 'code',
    scope: 'openid profile email',
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

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <App webAuth={webAuth} options={options} apolloClient={client} />,
  document.getElementById('root'),
);
