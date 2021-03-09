import {
  Grid,
  Avatar,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  SvgIcon,
} from '@material-ui/core';
import { ReactComponent as ArrowDownIcon } from 'src/assets/icons/arrow-down.svg';

import React from 'react';

export interface ProfileBriefProps {
  mainInfo: string;
  secondaryInfo: string;
  avatar?: string;
  shouldShowArrow?: boolean;
  shouldShowUserInfo?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: '46px',
      overflow: 'hidden',
    },
    roundedAvatar: {
      width: 46,
      height: 46,
      color: '#fff',
      backgroundColor: theme.palette.bg['dark-variant'],
    },
    userInfo: {
      maxWidth: 120,
      padding: 0,
      marginLeft: '17px',
    },
    userName: {
      fontSize: 14,
      fontWeight: 500,
    },
    organization: {
      fontSize: 11,
      color: '#90a0b7',
      fontWeight: 500,
      lineHeight: '25px',
    },
    arrowIcon: {
      alignSelf: 'center',
      height: '7px',
      marginLeft: 'auto',
    },
  }),
);

const ProfileBrief: React.FC<ProfileBriefProps> = ({
  mainInfo,
  secondaryInfo,
  avatar,
  shouldShowArrow = true,
  shouldShowUserInfo = true,
}: ProfileBriefProps) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Avatar
          src={avatar}
          variant="rounded"
          className={classes.roundedAvatar}
        />
      </Grid>
      {shouldShowUserInfo ? (
        <Grid item zeroMinWidth className={classes.userInfo}>
          <Typography noWrap className={classes.userName}>
            {mainInfo}
          </Typography>
          <Typography noWrap className={classes.organization}>
            {secondaryInfo}
          </Typography>
        </Grid>
      ) : null}
      {shouldShowArrow ? (
        <Grid className={classes.arrowIcon} item>
          <SvgIcon data-testid="arrowDown-icon" component={ArrowDownIcon} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default ProfileBrief;
