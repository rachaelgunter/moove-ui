import React, { useContext, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { User as Auth0User } from '@auth0/auth0-spa-js';

import AuthContext from 'src/index';
import { Role } from 'src/shared/types';

const claimsNamespace = process.env.REACT_APP_AUTH0_CLAIMS_NAMESPACE;

export type User = {
  sub: string;
  email: string;
  picture: string;
  name: string;
  roles: Role[];
  organization: string;
  GCPProjectName?: string;
  GCSBucketName?: string;
};

export const UserContext = React.createContext<User>({} as User);

interface UserProviderProps {
  children: React.ReactNode;
}

const CURRENT_USER_QUERY = gql`
  query getCurrentUser {
    getCurrentUser {
      name
      sub
      organization
      email
      picture
      GCSBucketName
      GCPProjectName
    }
  }
`;

const UserProvider: React.FC<UserProviderProps> = ({
  children,
}: UserProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [auth0User, setAuth0user] = useState<Auth0User>({} as Auth0User);
  const auth0 = useContext(AuthContext);
  const { loading, data } = useQuery(CURRENT_USER_QUERY);

  useEffect(() => {
    auth0?.getUser().then((actualAuth0User) => {
      if (!actualAuth0User) {
        return;
      }

      setAuth0user(actualAuth0User);
    });
  }, [auth0]);

  useEffect(() => {
    setUser({
      ...data?.getCurrentUser,
      ...auth0User,
      roles: auth0User[`${claimsNamespace}/roles`],
    });
  }, [data, auth0User]);

  if (loading) {
    return null;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
