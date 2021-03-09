import { gql, useMutation } from '@apollo/client';
import { Auth0Client } from '@auth0/auth0-spa-js';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../index';

interface AuthCallBackHandlerProps {
  auth0: Auth0Client;
}

const USER_SYNC_MUTATION = gql`
  mutation syncUserData($signedInUser: UserInput!) {
    syncUserData(signedInUser: $signedInUser) {
      sub
      name
      email
      organization
      role
      picture
    }
  }
`;

const AuthCallBackHandler: React.FC<AuthCallBackHandlerProps> = ({
  auth0,
}: AuthCallBackHandlerProps) => {
  const [syncUserData, { data }] = useMutation(USER_SYNC_MUTATION);

  useEffect(() => {
    const sendUserInfo = async () => {
      const user = await auth0?.getUser();
      if (!user) {
        return;
      }

      syncUserData({
        variables: {
          signedInUser: {
            sub: user.sub,
            email: user.email,
            picture: user.picture,
            name: user.name,
          },
        },
      });
    };
    sendUserInfo();
  }, [auth0, syncUserData]);

  return data ? <Redirect to="/" /> : null;
};

const AuthCallBackHandlerWrapper: React.FC = () => {
  return (
    <AuthContext.Consumer>
      {(auth0) => (auth0 ? <AuthCallBackHandler auth0={auth0} /> : null)}
    </AuthContext.Consumer>
  );
};

export default AuthCallBackHandlerWrapper;
