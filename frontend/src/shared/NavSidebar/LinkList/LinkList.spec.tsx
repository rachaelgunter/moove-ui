import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';
import { SvgIcon } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

import { User, UserContext } from 'src/auth/UserProvider';
import LinkList, { NavLink } from 'src/shared/NavSidebar/LinkList/LinkList';
import theme from 'src/app/styles';
import { Role } from 'src/shared/types';

jest.mock('src/index', () => Promise.resolve());

const createWrapper = (mockedUser: User, links: NavLink[]) =>
  render(
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={mockedUser}>
        <BrowserRouter>
          <LinkList links={links} />
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

describe('LinkList', () => {
  it('should display links according to access', () => {
    const links: NavLink[] = [
      {
        label: 'paidLink',
        onClick: jest.fn(),
        Icon: SvgIcon,
        allowedRoles: [Role.PAID_USER],
      },
      {
        label: 'freeLink',
        onClick: jest.fn(),
        Icon: SvgIcon,
        allowedRoles: [Role.USER, Role.PAID_USER, Role.ADMIN],
      },
    ];
    const wrapper = createWrapper(mockedUser, links);

    const firstLink = wrapper.getByTestId(`link-list-item__${links[0].label}`);
    const secondLink = wrapper.getByTestId(`link-list-item__${links[1].label}`);

    expect(firstLink.classList.contains('Mui-disabled')).toBe(true);
    expect(secondLink.classList.contains('Mui-disabled')).toBe(false);
  });
});
