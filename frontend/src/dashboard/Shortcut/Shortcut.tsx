import React from 'react';
import {
  makeStyles,
  Paper,
  SvgIcon,
  Theme,
  Typography,
} from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';

interface ShortcutProps {
  Icon: React.FC;
  label: string;
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 120,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.bg.light,
    boxShadow: theme.shadows[2],
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: darken(theme.palette.bg.light, 0.1),
    },
  },
  outlined: {
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  fontSizeLarge: {
    fontSize: theme.typography.pxToRem(40),
  },
}));

const Shortcut: React.FC<ShortcutProps> = ({
  Icon,
  label,
  onClick,
}: ShortcutProps) => {
  const classes = useStyles();

  return (
    <Paper
      classes={{
        root: classes.root,
        outlined: classes.outlined,
      }}
      variant="outlined"
      onClick={onClick}
    >
      <SvgIcon
        classes={{
          root: classes.icon,
          fontSizeLarge: classes.fontSizeLarge,
        }}
        fontSize="large"
        component={Icon}
      />
      <Typography display="block" variant="h6">
        {label}
      </Typography>
    </Paper>
  );
};

export default Shortcut;
