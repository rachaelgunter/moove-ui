import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, makeStyles } from '@material-ui/core';

import NavSidebar from 'src/shared/NavSidebar';
import Dashboard from 'src/dashboard';
import RoadIQ from 'src/road-iq';
import Settings from 'src/settings';

import theme from 'src/app/styles';
import routes from 'src/shared/routes';
import NavSidebarProvider from 'src/shared/NavSidebar/NavSidebarProvider';
import AuthCallBackHandler from 'src/auth/AuthCallbackHandler';
import PrivateRoute from 'src/app/PrivateRoute';
import UserProvider from 'src/auth/UserProvider';
import { LoadScript } from '@react-google-maps/api';

const DataAnalysis = React.lazy(() => import('src/data-analysis'));
const Users = React.lazy(() => import('src/users'));

const useStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY || ''}
      >
        <BrowserRouter>
          <CssBaseline />
          <Switch>
            <Route path={routes.callback.path}>
              <AuthCallBackHandler />
            </Route>
            <Route exact path={routes.roadIQ.path}>
              <RoadIQ />
            </Route>
            <UserProvider>
              <Route>
                <div className={classes.root}>
                  <NavSidebarProvider>
                    <NavSidebar />
                  </NavSidebarProvider>
                  <React.Suspense fallback={null}>
                    <Switch>
                      <Redirect exact from="/" to={routes.dashboard.path} />
                      <Route exact path={routes.dashboard.path}>
                        <Dashboard />
                      </Route>
                      <PrivateRoute
                        exact
                        path={routes.dataAnalysis.path}
                        allowedRoles={routes.dataAnalysis.allowedRoles}
                      >
                        <DataAnalysis />
                      </PrivateRoute>
                      <PrivateRoute
                        exact
                        path={routes.users.path}
                        allowedRoles={routes.users.allowedRoles}
                      >
                        <Users />
                      </PrivateRoute>
                      <PrivateRoute
                        exact
                        path={routes.settings.path}
                        allowedRoles={routes.settings.allowedRoles}
                      >
                        <Settings />
                      </PrivateRoute>
                    </Switch>
                  </React.Suspense>
                </div>
              </Route>
            </UserProvider>
          </Switch>
        </BrowserRouter>
      </LoadScript>
    </ThemeProvider>
  );
};

export default App;
