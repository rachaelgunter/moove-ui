import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/styles';

import { NavSidebarContextData } from 'src/shared/NavSidebar/NavSidebarProvider';
import NavSidebarMock from 'src/shared/NavSidebar/mocks';
import ExpandButton from 'src/shared/NavSidebar/ExpandButton/ExpandButton';
import theme from 'src/app/styles';

const createWrapper = (params?: Partial<NavSidebarContextData>): RenderResult =>
  render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavSidebarMock params={params}>
          <ExpandButton />
        </NavSidebarMock>
      </BrowserRouter>
    </ThemeProvider>,
  );

describe('ExpandButton', () => {
  let wrapper: RenderResult;
  const setWidthMock = jest.fn();

  describe('sidebar is expanded', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        isExpanded: true,
        setWidth: setWidthMock,
      });
    });

    it('should render collapse icon with collapse label', async () => {
      await expect(wrapper.findByText('Collapse')).resolves.toBeDefined();
      await expect(
        wrapper.findByText('sidebar-collapse.svg'),
      ).resolves.toBeDefined();
    });

    it('should trigger setWidth with collapsed type', async () => {
      const button = wrapper.getByTestId('expandButton');
      fireEvent.click(button);
      expect(setWidthMock).toBeCalledWith(68);
    });
  });

  describe('sidebar is collapsed', () => {
    beforeEach(() => {
      wrapper = createWrapper({
        isExpanded: false,
        setWidth: setWidthMock,
      });
    });

    it('should render expand icon with expand tooltip', async () => {
      await expect(
        wrapper.findByText('sidebar-expand.svg'),
      ).resolves.toBeDefined();
    });

    it('should trigger setWidth with expand type', async () => {
      const button = wrapper.getByTestId('expandButton');
      fireEvent.click(button);
      expect(setWidthMock).toBeCalledWith(256);
    });
  });
});
