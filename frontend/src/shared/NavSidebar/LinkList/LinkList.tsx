import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { List } from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';

import { Role } from 'src/shared/types';
import { checkOrgMembership, haveAccess } from 'src/shared/authorization/utils';
import { UserContext } from 'src/auth/UserProvider';
import DisabledLinkTooltip from 'src/shared/DisabledLinkTooltip/DisabledLinkTooltip';
import { LinkListItem } from './ListItem';

export interface NavLink {
  label: string;
  path?: string;
  onClick: () => void;
  Icon: SvgIconComponent;
  allowedRoles: Role[];
  organizationMembershipRequired?: boolean;
}

interface LinkListProps {
  links: NavLink[];
}

const LinkList: React.FC<LinkListProps> = ({ links }: LinkListProps) => {
  const { pathname } = useLocation();
  const user = useContext(UserContext);

  return (
    <List>
      {links.map(
        ({
          label,
          onClick,
          path,
          Icon,
          allowedRoles,
          organizationMembershipRequired,
        }) => {
          const isSelected = Boolean(path && pathname.startsWith(path));
          const hasUserAccess = haveAccess(user.roles, allowedRoles);
          const isUserOrgMember = organizationMembershipRequired
            ? checkOrgMembership(user)
            : true;

          return (
            <LinkListItem
              disabledLabel={
                <DisabledLinkTooltip
                  isOrganisationMember={isUserOrgMember}
                  hasRoles={hasUserAccess}
                  label={label}
                />
              }
              data-testid={`link-list-item__${label}`}
              disabled={!hasUserAccess || !isUserOrgMember}
              onClick={onClick}
              key={label}
              selected={isSelected}
              Icon={Icon}
              label={label}
            />
          );
        },
      )}
    </List>
  );
};

export default LinkList;
