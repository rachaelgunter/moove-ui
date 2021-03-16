import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import React from 'react';
import { CURRENT_USER_QUERY } from 'src/shared/queries';
import ProfileMenuItem from './ProfileMenuItem';
import ProfileMenu from './ProfileMenu';
import ProfileBrief from './ProfileBrief';
import Logout from './Logout';

interface ProfileProps {
  isNavSidebarOpened: boolean;
}

const useStyles = makeStyles<Theme, ProfileProps>((theme: Theme) =>
  createStyles({
    root: ({ isNavSidebarOpened }) => ({
      display: 'flex',
      margin: isNavSidebarOpened ? 11 : 4,
      padding: isNavSidebarOpened ? theme.spacing(1, 1.5) : theme.spacing(1),
      backgroundColor: theme.palette.bg.dark,
      borderRadius: 8,
      cursor: 'pointer',
    }),
    profileBriefMenuItem: {
      color: theme.palette.text.primary,
      padding: '8px 0',
    },
  }),
);

const Profile: React.FC<ProfileProps> = ({
  isNavSidebarOpened,
}: ProfileProps) => {
  const classes = useStyles({ isNavSidebarOpened });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { data } = useQuery(CURRENT_USER_QUERY);
  const user = data?.getCurrentUser;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Paper className={classes.root} elevation={0} onClick={handleClick}>
        <ProfileBrief
          mainInfo={user.name}
          secondaryInfo={user.organization}
          avatar={user.picture}
          shouldShowArrow={isNavSidebarOpened}
          shouldShowUserInfo={isNavSidebarOpened}
        />
      </Paper>
      <ProfileMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ProfileMenuItem onClick={handleClose}>
          <Box className={classes.profileBriefMenuItem}>
            <ProfileBrief
              mainInfo={user.name}
              secondaryInfo={user.email}
              avatar={user.picture}
              shouldShowArrow={false}
            />
          </Box>
        </ProfileMenuItem>
        <ProfileMenuItem onClick={handleClose}>
          <Logout />
        </ProfileMenuItem>
      </ProfileMenu>
    </div>
  );
};

export default Profile;
