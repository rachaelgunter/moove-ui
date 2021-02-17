import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { NavSidebarContextData } from 'src/shared/NavSidebar/NavSidebarProvider';
import NavSidebarMock from 'src/shared/NavSidebar/mocks/NavSidebarProvider';
import Logo from './Logo';

const createWrapper = (params?: Partial<NavSidebarContextData>): RenderResult =>
  render(
    <BrowserRouter>
      <NavSidebarMock params={params}>
        <Logo />
      </NavSidebarMock>
    </BrowserRouter>,
  );

describe('Logo', () => {
  describe('sidebar is expanded', () => {
    it('should render full logo', () => {
      const wrapper = createWrapper({ isExpanded: true });
      const logo = wrapper.getByTestId('logo-icon');
      expect(logo.textContent).toEqual('galileo-logo.svg');
    });
  });

  describe('sidebar is collapsed', () => {
    it('should render only logo icon', () => {
      const wrapper = createWrapper({ isExpanded: false });
      const logo = wrapper.getByTestId('logo-icon');
      expect(logo.textContent).toEqual('galileo-logo-symbol.svg');
    });
  });
});
