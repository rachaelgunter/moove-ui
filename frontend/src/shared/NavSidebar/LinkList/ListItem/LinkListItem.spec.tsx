import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';
import { SvgIcon } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import { NavSidebarContextData } from 'src/shared/NavSidebar/NavSidebarProvider';
import NavSidebarMock from 'src/shared/NavSidebar/mocks/NavSidebarProvider';
import { LinkListItem } from 'src/shared/NavSidebar/LinkList/ListItem/index';
import theme from 'src/app/styles';

const testLabel = 'test label';
const createWrapper = (params?: Partial<NavSidebarContextData>): RenderResult =>
  render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavSidebarMock params={params}>
          <LinkListItem
            component={Link}
            to="/"
            label={testLabel}
            Icon={SvgIcon}
          />
        </NavSidebarMock>
      </BrowserRouter>
    </ThemeProvider>,
  );

describe('LinkListItem', () => {
  describe('sidebar is expanded', () => {
    it('should not create tooltip', () => {
      const wrapper = createWrapper({ isExpanded: true });
      const tooltip = wrapper.getByTestId('listItem-tooltip');
      expect(tooltip.title).toEqual('');
    });
  });

  describe('sidebar is collapsed', () => {
    it('should create tooltip', () => {
      const wrapper = createWrapper({ isExpanded: false });
      const tooltip = wrapper.getByTestId('listItem-tooltip');
      expect(tooltip.title).toEqual(testLabel);
    });
  });
});
