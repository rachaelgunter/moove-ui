import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory, History } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { Router } from 'react-router-dom';

import theme from 'src/app/styles';
import { User, UserContext } from 'src/auth/UserProvider';
import PrivateRoute from 'src/app/PrivateRoute';
import { Role } from 'src/shared/types';

jest.mock('src/index', () => Promise.resolve());

const createWrapper = (
  mockedUser: User,
  history: History,
  routeProps: unknown,
) =>
  render(
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={mockedUser}>
        <Router history={history}>
          <PrivateRoute {...routeProps}>
            <div>Private content</div>
          </PrivateRoute>
        </Router>
      </UserContext.Provider>
    </ThemeProvider>,
  );

const mockedUser = {
  sub: 'sub',
  email: 'email@email.com',
  picture: 'pic.img',
  name: 'test',
  roles: [],
  organization: 'org.com',
};

const path = '/test';

describe('PrivateRoute', () => {
  let history: History;

  beforeEach(() => {
    history = createBrowserHistory();
  });

  describe('route has empty allowed roles list', () => {
    it('should accept user', async () => {
      const wrapper = createWrapper(mockedUser, history, {
        path,
        allowedRoles: [],
      });

      history.push(path);

      expect(history.location.pathname).toBe(path);
      await expect(
        wrapper.findByText('Private content'),
      ).resolves.toBeDefined();
    });
  });

  describe('route has filled allowed roles list', () => {
    describe('user does not have the required roles', () => {
      it('should redirect to root page', async () => {
        const wrapper = createWrapper(
          {
            ...mockedUser,
            roles: [Role.USER],
          },
          history,
          {
            path,
            allowedRoles: [Role.PAID_USER],
          },
        );

        history.push(path);

        expect(history.location.pathname).toBe('/');
        await expect(
          wrapper.findByText('Private content'),
        ).rejects.toBeDefined();
      });
    });

    describe('user has the required roles', () => {
      it('should accept user', async () => {
        const wrapper = createWrapper(
          {
            ...mockedUser,
            roles: [Role.USER, Role.PAID_USER],
          },
          history,
          {
            path,
            allowedRoles: [Role.PAID_USER],
          },
        );

        history.push(path);

        expect(history.location.pathname).toBe(path);
        await expect(
          wrapper.findByText('Private content'),
        ).resolves.toBeDefined();
      });
    });
  });
});
