import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { List } from '@material-ui/core';
import { SvgIconComponent } from '@material-ui/icons';

import { Role } from 'src/shared/types';
import { checkOrgMembership, haveAccess } from 'src/shared/authorization/utils';
import { UserContext } from 'src/auth/UserProvider';
import theme from 'src/app/styles';
import { LinkListItem } from './ListItem';

export interface NavLink {
  label: string;
  path?: string;
  onClick: () => void;
  Icon: SvgIconComponent;
  allowedRoles: Role[];
  organizationMembershipRequired?: boolean;
}

const BUY_PAID_ACCOUNT_URL = 'http://moove.ai';

interface LinkListProps {
  links: NavLink[];
}

const getDisabledTooltip = (
  isOrganisationMember: boolean,
  hasRoles: boolean,
  label: string,
) => {
  if (!hasRoles) {
    return (
      <>
        {label}
        <br />
        <br />
        Sign up for a paid account at{' '}
        <a
          style={{ color: theme.palette.secondary.main }}
          href={BUY_PAID_ACCOUNT_URL}
        >
          {BUY_PAID_ACCOUNT_URL}
        </a>
      </>
    );
  }
  if (!isOrganisationMember) {
    return <>You have to be an organization member to view this section</>;
  }

  return <></>;
};

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

          const disabledLabel = getDisabledTooltip(
            isUserOrgMember,
            hasUserAccess,
            label,
          );

          return (
            <LinkListItem
              disabledLabel={disabledLabel}
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
