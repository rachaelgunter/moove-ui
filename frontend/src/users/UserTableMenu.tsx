import React, { FC, useState } from 'react';
import {
  IconButton,
  Theme,
  makeStyles,
  Menu,
  MenuItem,
  Link,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { User } from 'src/auth/UserProvider';
import { FontFamily } from 'src/app/styles/fonts';
import AlertDialog from 'src/shared/AlertDialog';
import { AlertDialogType } from 'src/shared/AlertDialog/AlertDialog';
import useDeleteUser from './hooks/useDeleteUser';

interface UserTableMenuProps {
  user: User;
}

const useStyles = makeStyles((theme: Theme) => ({
  rowActionButton: {
    color: '#fff',
    padding: 0,
  },
  link: {
    textAlign: 'left',
    width: '100%',
  },
  actionsMenu: {
    width: 140,
  },
  actionsMenuItem: {
    fontFamily: FontFamily.ROBOTO,
    '& > a, & > button': {
      color: theme.palette.text.primary,
      '&:hover': {
        textDecoration: 'none',
      },
    },
    '& > button p': {
      fontFamily: FontFamily.ROBOTO,
    },
  },
  actionsMenuButton: {
    color: '#fff',
    marginRight: '15px',
  },
}));

const UserTableMenu: FC<UserTableMenuProps> = ({
  user,
}: UserTableMenuProps) => {
  const { email, sub } = user;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [deletionError, setDeletionError] = useState('');
  const [deleteUser, { loading }] = useDeleteUser();

  const onMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const onSwitch = () => setOpen(!open);

  const onDelete = () => {
    deleteUser({
      variables: { deleteUserPayload: { email, sub } },
    })
      .catch(() =>
        setDeletionError('Unable to delete this user. Please try again later.'),
      )
      .finally(() => {
        onSwitch();
      });
  };

  return (
    <>
      <IconButton className={classes.rowActionButton} onClick={onMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="user-menu"
        classes={{ list: classes.actionsMenu }}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
      >
        <MenuItem className={classes.actionsMenuItem} onClick={onSwitch}>
          <Link className={classes.link} component="button">
            <Typography color="textPrimary" variant="body1">
              Delete
            </Typography>
          </Link>
        </MenuItem>
      </Menu>
      <AlertDialog
        open={open}
        title="You are about to delete this user."
        message="This action cannot be undone. Do you want to proceed?"
        actionButtonTitle="Delete"
        hasAction
        onAction={onDelete}
        onClose={onSwitch}
        loading={loading}
        type={AlertDialogType.DANGER}
      />
      <AlertDialog
        open={!!deletionError.length}
        title="Error"
        message={deletionError}
        onClose={() => setDeletionError('')}
        type={AlertDialogType.DANGER}
      />
    </>
  );
};

export default UserTableMenu;
