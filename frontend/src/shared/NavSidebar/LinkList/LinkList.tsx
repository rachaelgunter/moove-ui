import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { List } from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';

import { Role } from 'src/shared/types';
import { haveAccess } from 'src/shared/authorization/utils';
import { UserContext } from 'src/auth/UserProvider';
import { LinkListItem } from './ListItem';

export interface NavLink {
  label: string;
  path?: string;
  onClick: () => void;
  Icon: SvgIconComponent;
  allowedRoles: Role[];
}

interface LinkListProps {
  links: NavLink[];
}

const LinkList: React.FC<LinkListProps> = ({ links }: LinkListProps) => {
  const { pathname } = useLocation();
  const user = useContext(UserContext);

  return (
    <List>
      {links.map(({ label, onClick, path, Icon, allowedRoles }) => {
        const isSelected = Boolean(path && pathname.startsWith(path));
        const isDisabled = !haveAccess(user.roles, allowedRoles);

        return (
          <LinkListItem
            data-testid={`link-list-item__${label}`}
            disabled={isDisabled}
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
