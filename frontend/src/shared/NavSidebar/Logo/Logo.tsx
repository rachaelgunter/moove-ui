import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core';

import { ReactComponent as GalileoLogoExpanded } from 'src/assets/logo/galileo-logo.svg';
import { ReactComponent as GalileoLogoCollapsed } from 'src/assets/logo/galileo-logo-symbol.svg';
import routes from 'src/shared/routes';
import { NavSidebarContext } from '../NavSidebarProvider';
import { BaseListItem } from '../LinkList/ListItem';

const useStyles = makeStyles((theme: Theme) => ({
  expanded: {
    padding: theme.spacing(3, 3),
  },
  collapsed: {
    padding: theme.spacing(3, 2),
  },
}));

const Logo: React.FC = () => {
  const classes = useStyles();
  const { isExpanded } = useContext(NavSidebarContext);

  const LogoIcon = isExpanded ? GalileoLogoExpanded : GalileoLogoCollapsed;
  const className = isExpanded ? classes.expanded : classes.collapsed;

  return (
    <BaseListItem component={Link} to={routes.dashboard} className={className}>
      <LogoIcon data-testid="logo-icon" />
    </BaseListItem>
  );
};

export default Logo;
