import React from 'react';
import { useLocation } from 'react-router-dom';
import { List } from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';

import { LinkListItem } from './ListItem';

export interface NavLink {
  label: string;
  path?: string;
  onClick: () => void;
  Icon: SvgIconComponent;
}

interface LinkListProps {
  links: NavLink[];
}

const LinkList: React.FC<LinkListProps> = ({ links }: LinkListProps) => {
  const { pathname } = useLocation();

  return (
    <List>
      {links.map(({ label, onClick, path, Icon }) => {
        const isSelected = Boolean(path && pathname.startsWith(path));

        return (
          <LinkListItem
            onClick={onClick}
            key={label}
            selected={isSelected}
            Icon={Icon}
            label={label}
          />
        );
      })}
    </List>
  );
};

export default LinkList;
