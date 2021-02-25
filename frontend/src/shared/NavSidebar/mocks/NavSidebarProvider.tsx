import React from 'react';
import {
  NavSidebarContext,
  NavSidebarContextData,
} from 'src/shared/NavSidebar/NavSidebarProvider/NavSidebarProvider';

interface NavSidebarMockProps {
  children: React.ReactNode;
  params?: Partial<NavSidebarContextData>;
}

const NavSidebarMock: React.FC<NavSidebarMockProps> = ({
  children,
  params,
}: NavSidebarMockProps) => {
  return (
    <NavSidebarContext.Provider
      value={{
        isExpanded: true,
        width: 256,
        setWidth: jest.fn(),
        ...params,
      }}
    >
      {children}
    </NavSidebarContext.Provider>
  );
};

NavSidebarMock.defaultProps = {
  params: {},
};

export default NavSidebarMock;
