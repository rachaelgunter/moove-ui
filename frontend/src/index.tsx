import React, { createContext } from 'react';
import { render } from 'react-dom';

import App from 'src/app';

import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/300.css';
import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import ErrorPage from 'src/auth/ErrorPage';
import theme from 'src/app/styles';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import { loginRedirectLink, authLink, httpLink } from './graphql-client/links';
import store from './kepler/store';

const domain = process.env.REACT_APP_AUTH0_DOMAIN ?? '';
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID ?? '';
const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI ?? '';
const audience = process.env.REACT_APP_AUTH0_AUDIENCE ?? '';

if (
  (!domain || !clientId || !redirectUri || !audience) &&
  process.env.NODE_ENV !== 'test'
) {
  throw new Error('Cannot retrieve auth0 configuration');
}

const AuthContext = createContext<Auth0Client | null>(null);

createAuth0Client({
  domain,
  client_id: clientId,
  redirect_uri: redirectUri,
  responseType: 'code',
  useRefreshTokens: true,
  audience,
}).then(async (auth0) => {
  let token = '';
  const queryParams = new URLSearchParams(window.location.search);

  if (queryParams.has('error')) {
    return render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorPage
          error={queryParams.get('error_description') || 'Undefined error'}
        />
      </ThemeProvider>,
      document.getElementById('root'),
    );
  }

  // Check if the token is present on page reload
  try {
    if (queryParams.has('code')) {
      await auth0.handleRedirectCallback();
    }

    token = await auth0.getTokenSilently({ audience });
  } catch (_) {
    return auth0.loginWithRedirect();
  }

  const withTokenLink = setContext(async () => {
    if (token) {
      return { token };
    }
    try {
      token = await auth0.getTokenSilently({ audience });
      return token;
    } catch (_) {
      return auth0.loginWithRedirect();
    }
  });

  const client = new ApolloClient({
    link: from([withTokenLink, loginRedirectLink(auth0), authLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Dataset: {
          keyFields: ['analysisName'],
        },
        User: {
          keyFields: ['email'],
        },
      },
    }),
  });

  return render(
    <ApolloProvider client={client}>
      <AuthContext.Provider value={auth0}>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthContext.Provider>
    </ApolloProvider>,
    document.getElementById('root'),
  );
});

export default AuthContext;
