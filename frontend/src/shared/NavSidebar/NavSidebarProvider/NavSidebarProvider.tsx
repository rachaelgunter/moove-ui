import React from 'react';
import useLocalStorage from 'src/shared/hooks/use-local-storage';

export type NavSidebarContextData = {
  width: number;
  setWidth: (width: SidebarWidth) => void;
  isExpanded: boolean;
};

interface NavSidebarProviderProps {
  children: React.ReactNode;
}

export enum SidebarWidth {
  EXPANDED = 256,
  COLLAPSED = 68,
}

export const NavSidebarContext = React.createContext<NavSidebarContextData>(
  {} as NavSidebarContextData,
);

const SIDEBAR_WIDTH_STORAGE_KEY = 'SIDEBAR_WIDTH';

const NavSidebarProvider: React.FC<NavSidebarProviderProps> = ({
  children,
}: NavSidebarProviderProps) => {
  const [width, setWidth] = useLocalStorage<SidebarWidth>(
    SIDEBAR_WIDTH_STORAGE_KEY,
    SidebarWidth.EXPANDED,
  );

  return (
    <NavSidebarContext.Provider
      value={{
        width,
        setWidth,
        isExpanded: width === SidebarWidth.EXPANDED,
      }}
    >
      {children}
    </NavSidebarContext.Provider>
  );
};

export default NavSidebarProvider;
