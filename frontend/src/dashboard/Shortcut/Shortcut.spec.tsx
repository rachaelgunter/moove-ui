import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';

import { User, UserContext } from 'src/auth/UserProvider';
import theme from 'src/app/styles';
import { Role } from 'src/shared/types';
import Shortcut, { ShortcutProps } from './Shortcut';

jest.mock('src/index', () => Promise.resolve());

const shortcut = {
  label: 'Analytics',
  Icon: () => <></>,
  onClick: () => {},
  allowedRoles: [Role.PAID_USER, Role.ADMIN, Role.SUPER_ADMIN],
};

const createWrapper = (mockedUser: User, shortcutProps: ShortcutProps) =>
  render(
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={mockedUser}>
        <BrowserRouter>
          <Shortcut {...shortcutProps} />
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>,
  );

const mockedUser = {
  sub: 'sub',
  email: 'email@email.com',
  picture: 'pic.img',
  name: 'test',
  roles: [Role.USER],
  organization: 'org.com',
  organizationObject: {
    id: 1,
    name: 'org',
    GCSBucketName: '',
    GCPProjectName: '',
  },
};

describe('Shortcut', () => {
  it('should display tooltip if user does not have access to the shortcut link', async () => {
    const wrapper = createWrapper(mockedUser, shortcut);
    fireEvent.mouseOver(wrapper.getByText('Analytics'));
    await waitFor(() => wrapper.getByTestId('tooltip__Analytics'));
    const tooltip = wrapper.getByTestId('tooltip__Analytics');
    expect(tooltip).toBeDefined();
  });

  it('should not display tooltip if user has access to shotrcuts content', async () => {
    const userWithAccess = { ...mockedUser, roles: [Role.PAID_USER] };
    const wrapper = createWrapper(userWithAccess, shortcut);
    fireEvent.mouseOver(wrapper.getByText('Analytics'));
    await waitFor(() => wrapper.queryByTestId('tooltip__Analytics'));
    const tooltip = wrapper.queryByTestId('tooltip__Analytics');
    expect(tooltip).toBeNull();
  });
});
