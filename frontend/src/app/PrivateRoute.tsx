import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { Role } from 'src/shared/types';
import { haveAccess } from 'src/shared/authorization/utils';
import { UserContext } from 'src/auth/UserProvider';

interface PrivateRouteProps extends RouteProps {
  allowedRoles?: Role[];
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles = [],
  ...rest
}: PrivateRouteProps) => {
  const user = useContext(UserContext);

  const isAllowed = haveAccess(user.roles, allowedRoles);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAllowed ? React.cloneElement(children, props) : <Redirect to="/" />
      }
    />
  );
};

PrivateRoute.defaultProps = {
  allowedRoles: [],
};

export default PrivateRoute;
