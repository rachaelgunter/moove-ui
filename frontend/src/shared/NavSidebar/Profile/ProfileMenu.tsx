import { MenuProps, Menu } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';

const ProfileMenu = withStyles((theme) => ({
  paper: {
    width: '234px',
    borderRadius: 0,
    'box-shadow': '6px 0 18px 0 rgba(0, 0, 0, 0.06)',
  },
  list: {
    padding: 0,
  },
}))((props: MenuProps) => (
  <Menu
    id="simple-menu"
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    getContentAnchorEl={null}
    keepMounted
    {...props}
  />
));

export default ProfileMenu;
