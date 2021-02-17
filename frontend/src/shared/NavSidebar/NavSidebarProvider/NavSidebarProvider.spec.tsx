import React from 'react';
import { render, screen } from '@testing-library/react';

import NavSidebarProvider, { NavSidebarContext } from './NavSidebarProvider';

const keyText = 'sidebar values:';
const createWrapper = () =>
  render(
    <NavSidebarProvider>
      <NavSidebarContext.Consumer>
        {({ width, isExpanded }) => (
          <div>{`${keyText} ${width} ${isExpanded}`}</div>
        )}
      </NavSidebarContext.Consumer>
    </NavSidebarProvider>,
  );

describe('NavSidebarProvider', () => {
  it('should have the correct initial value', () => {
    createWrapper();
    expect(screen.getByText(new RegExp(keyText))).toHaveTextContent(
      `${keyText} 256 true`,
    );
  });
});
