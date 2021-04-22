import React, { useContext } from 'react';
import {
  makeStyles,
  Paper,
  SvgIcon,
  Theme,
  Typography,
} from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { Role } from 'src/shared/types';
import Tooltip from 'src/shared/NavSidebar/Tooltip';
import { UserContext } from 'src/auth/UserProvider';
import DisabledLinkTooltip from 'src/shared/DisabledLinkTooltip/DisabledLinkTooltip';
import { haveAccess } from 'src/shared/authorization/utils';

export interface ShortcutProps {
  Icon: React.FC;
  label: string;
  onClick: () => void;
  allowedRoles: Role[];
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
  allowedRoles,
}: ShortcutProps) => {
  const classes = useStyles();
  const { roles } = useContext(UserContext);

  return (
    <Tooltip
      interactive
      title={
        haveAccess(roles, allowedRoles) ? (
          ''
        ) : (
          <DisabledLinkTooltip
            isOrganisationMember
            hasRoles={haveAccess(roles, allowedRoles)}
            label={label}
          />
        )
      }
    >
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
    </Tooltip>
  );
};

export default Shortcut;
