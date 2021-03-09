import React, { useContext } from 'react';
import { SvgIcon } from '@material-ui/core';

import { ReactComponent as ExpandIcon } from 'src/assets/icons/sidebar-expand.svg';
import { ReactComponent as CollapseIcon } from 'src/assets/icons/sidebar-collapse.svg';
import { NavSidebarContext, SidebarWidth } from '../NavSidebarProvider';
import { LinkListItem } from '../LinkList/ListItem';

const ExpandButton: React.FC = () => {
  const { isExpanded, setWidth } = useContext(NavSidebarContext);

  const Icon = () => (
    <SvgIcon
      data-testid="expandButton-icon"
      fontSize="small"
      component={isExpanded ? CollapseIcon : ExpandIcon}
    />
  );

  const onClick = () => {
    setWidth(isExpanded ? SidebarWidth.COLLAPSED : SidebarWidth.EXPANDED);
  };

  return (
    <LinkListItem
      data-testid="expandButton"
      onClick={onClick}
      Icon={Icon}
      label={isExpanded ? 'Collapse' : 'Expand'}
    />
  );
};

export default ExpandButton;
