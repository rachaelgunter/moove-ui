import React, { FC } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Box,
  IconButton,
  TableCell,
  TableRow,
  Theme,
} from '@material-ui/core';
import { User } from 'src/auth/UserProvider';

interface UsersTableRowProps {
  user: User;
}

const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    fontSize: '13px',
    padding: '8px 16px',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarCell: {
    paddingLeft: theme.spacing(2),
    display: 'flex',
  },
  userName: {
    marginLeft: '15px',
    lineHeight: '40px',
  },
  rowActionButton: {
    color: '#fff',
    padding: 0,
  },
}));

const UsersTableRow: FC<UsersTableRowProps> = ({
  user,
}: UsersTableRowProps) => {
  const classes = useStyles();

  return (
    <TableRow key={user.sub} data-testid="columns-table-row">
      <TableCell className={classes.cell} key={`${user.sub}-name`}>
        <Box className={classes.avatarCell}>
          <Avatar src={user.picture} />
          <Box className={classes.userName}>{user.name}</Box>
        </Box>
      </TableCell>
      <TableCell className={classes.cell} key={`${user.sub}-email`}>
        {user.email}
      </TableCell>
      <TableCell className={classes.cell} key={`${user.sub}-role`}>
        {user.roles?.join(' ') ?? ''}
      </TableCell>
      <TableCell className={classes.cell} key={`${user.sub}-lastLogin`}>
        {user.lastLogin}
      </TableCell>
      <TableCell className={classes.cell} key={`${user.sub}-createdAt`}>
        {user.createdAt}
      </TableCell>
      <TableCell className={classes.cell}>
        <IconButton className={classes.rowActionButton}>
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UsersTableRow;
