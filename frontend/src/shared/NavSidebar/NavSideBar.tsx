import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Divider, Drawer, List, makeStyles, Theme } from '@material-ui/core';
import {
  DashboardOutlined as DashboardIcon,
  MoreHoriz as MoreHorizIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  ViewAgendaOutlined as ViewAgendaIcon,
  ViewWeekOutlined as ViewWeekOutlinedIcon,
} from '@material-ui/icons';

import routes from 'src/shared/routes';
import { NavSidebarContext } from './NavSidebarProvider';
import ExpandButton from './ExpandButton';
import Profile from './Profile';
import Logo from './Logo';
import LinkList, { NavLink } from './LinkList';

interface SidebarStyleProps {
  width: number;
}

const useStyles = makeStyles<Theme, SidebarStyleProps, string>(
  (theme: Theme) => {
    const transition = theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    });

    return {
      root: ({ width }: SidebarStyleProps) => ({
        width,
        flexShrink: 0,
        transition,
      }),
      paper: ({ width }: SidebarStyleProps) => ({
        width,
        overflow: 'hidden',
        backgroundColor: theme.palette.bg.main,
        transition,
      }),
      paperAnchorDockedLeft: {
        borderRight: 'none',
      },
      divider: {
        backgroundColor: theme.palette.common.white,
        opacity: 0.1,
      },
    };
  },
);

const NavSidebar: React.FC = () => {
  const history = useHistory();
  const { width, isExpanded } = useContext(NavSidebarContext);
  const classes = useStyles({ width });

  const primaryLinks: NavLink[] = [
    {
      label: 'Dashboard',
      path: routes.dashboard.path,
      onClick: () => history.push(routes.dashboard.path),
      Icon: DashboardIcon,
      allowedRoles: routes.dashboard.allowedRoles,
    },
    {
      label: 'Data Analysis',
      path: routes.dataAnalysis.path,
      onClick: () => history.push(routes.dataAnalysis.path),
      Icon: ViewAgendaIcon,
      allowedRoles: routes.dataAnalysis.allowedRoles,
    },
    {
      label: 'RoadIQ',
      onClick: () => history.push(routes.roadIQ.path),
      Icon: ViewWeekOutlinedIcon,
      allowedRoles: routes.roadIQ.allowedRoles,
    },
  ];

  const secondaryLinks: NavLink[] = [
    {
      label: 'Users',
      path: routes.users.path,
      onClick: () => history.push(routes.users.path),
      Icon: PersonOutlineOutlinedIcon,
      allowedRoles: routes.users.allowedRoles,
    },
    {
      label: 'Settings',
      path: routes.settings.path,
      onClick: () => history.push(routes.settings.path),
      Icon: MoreHorizIcon,
      allowedRoles: routes.settings.allowedRoles,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      classes={{
        root: classes.root,
        paper: classes.paper,
        paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
      }}
      anchor="left"
    >
      <Logo />
      <Profile isNavSidebarOpened={isExpanded} />
      <LinkList links={primaryLinks} />
      <Divider className={classes.divider} />
      <LinkList links={secondaryLinks} />
      <Divider className={classes.divider} />
      <List>
        <ExpandButton />
      </List>
    </Drawer>
  );
};

export default NavSidebar;
