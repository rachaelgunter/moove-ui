import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List } from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';

import { LinkListItem } from './ListItem';

export interface NavLink {
  label: string;
  path: string;
  Icon: SvgIconComponent;
}

interface LinkListProps {
  links: NavLink[];
}

const LinkList: React.FC<LinkListProps> = ({ links }: LinkListProps) => {
  const { pathname } = useLocation();

  return (
    <List>
      {links.map(({ label, path, Icon }) => {
        const isSelected = pathname.startsWith(path);

        return (
          <LinkListItem
            component={Link}
            key={label}
            to={path}
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
