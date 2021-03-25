import { ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Auth0Client } from '@auth0/auth0-spa-js';

export const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API,
  fetchOptions: { credentials: 'same-origin' },
});

export const authLink = setContext((_, context) => {
  return {
    headers: {
      ...context.headers,
      ...(context.token ? { Authorization: `Bearer ${context.token}` } : {}),
    },
  };
});

export const loginRedirectLink = (auth0Client: Auth0Client): ApolloLink =>
  onError(({ graphQLErrors }) => {
    if (
      graphQLErrors?.some(
        (error) => error?.extensions?.exception?.response?.statusCode === 401,
      )
    ) {
      auth0Client.loginWithRedirect();
    }
  });
