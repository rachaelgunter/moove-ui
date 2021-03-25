import { MenuItem, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const ProfileMenuItem = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.secondary,
    background: theme.palette.bg.light,
    '&:hover': {
      background: theme.palette.bg.dark,
    },
    '&:focus-visible': {
      background: theme.palette.bg.light,
    },
    borderBottom: '1px solid',
    borderColor: 'rgba(255, 255,255, 0.12)',
    '&:last-child': {
      border: 'none',
    },
    fontSize: 14,
  },
}))(MenuItem);

export default ProfileMenuItem;
