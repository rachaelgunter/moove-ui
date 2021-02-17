import React, { useContext } from 'react';
import { Divider, Drawer, List, makeStyles, Theme } from '@material-ui/core';
import {
  DashboardOutlined as DashboardIcon,
  ViewAgendaOutlined as ViewAgendaIcon,
  ViewWeekOutlined as ViewWeekOutlinedIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  MoreHoriz as MoreHorizIcon,
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
  const { width } = useContext(NavSidebarContext);
  const classes = useStyles({ width });

  const primaryLinks: NavLink[] = [
    {
      label: 'Dashboard',
      path: routes.dashboard,
      Icon: DashboardIcon,
    },
    {
      label: 'Data Analysis',
      path: routes.dataAnalysis,
      Icon: ViewAgendaIcon,
    },
    {
      label: 'RoadIQ',
      path: routes.roadIQ,
      Icon: ViewWeekOutlinedIcon,
    },
  ];

  const secondaryLinks: NavLink[] = [
    {
      label: 'Users',
      path: routes.users,
      Icon: PersonOutlineOutlinedIcon,
    },
    {
      label: 'Settings',
      path: routes.settings,
      Icon: MoreHorizIcon,
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
      <Profile />
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
