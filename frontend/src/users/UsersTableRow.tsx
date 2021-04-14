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
import { Role } from 'src/shared/types';

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

const rolesUiMap: { [key in Role]: string } = {
  [Role.USER]: 'Freemium',
  [Role.PAID_USER]: 'Paid',
  [Role.SUPER_ADMIN]: 'Super Admin',
  [Role.ADMIN]: 'Admin',
  [Role.API_USER]: 'API User',
  [Role.ROAD_IQ_USER]: 'RoadIQ User',
};

const UsersTableRow: FC<UsersTableRowProps> = ({
  user,
}: UsersTableRowProps) => {
  const classes = useStyles();

  const formatRoles = (roles: Role[] | null): string => {
    return roles?.map((role) => rolesUiMap[role]).join(', ') ?? '';
  };

  const formatDate = (dateLike: string | undefined) => {
    if (!dateLike) {
      return '';
    }
    return new Date(dateLike).toUTCString();
  };

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
        {formatRoles(user.roles)}
      </TableCell>
      <TableCell className={classes.cell} key={`${user.sub}-lastLogin`}>
        {formatDate(user.lastLogin)}
      </TableCell>
      <TableCell className={classes.cell} key={`${user.sub}-createdAt`}>
        {formatDate(user.createdAt)}
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
