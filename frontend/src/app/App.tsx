import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, makeStyles } from '@material-ui/core';

import NavSidebar from 'src/shared/NavSidebar';
import Dashboard from 'src/dashboard';
import DataAnalysis from 'src/data-analysis';
import RoadIQ from 'src/road-iq';
import Users from 'src/users';
import Settings from 'src/settings';

import client from 'src/apollo-client';
import theme from 'src/app/styles';
import routes from 'src/shared/routes';
import NavSidebarProvider from 'src/shared/NavSidebar/NavSidebarProvider';
import SignIn from 'src/auth/SignIn';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Switch>
            <Route exact path={routes.signIn}>
              <SignIn />
            </Route>
            <Route exact path={routes.roadIQ}>
              <RoadIQ />
            </Route>
            <Route>
              <div className={classes.root}>
                <NavSidebarProvider>
                  <NavSidebar />
                </NavSidebarProvider>
                <Switch>
                  <Redirect exact from="/" to={routes.dashboard} />
                  <Route exact path={routes.dashboard}>
                    <Dashboard />
                  </Route>
                  <Route exact path={routes.dataAnalysis}>
                    <DataAnalysis />
                  </Route>
                  <Route exact path={routes.users}>
                    <Users />
                  </Route>
                  <Route exact path={routes.settings}>
                    <Settings />
                  </Route>
                </Switch>
              </div>
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
