import { createStyles, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthContext from 'src';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '40px',
    },
    logoutText: {
      marginLeft: '17px',
    },
    logoutIcon: {
      height: '24px',
    },
  }),
);

const Logout: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container alignItems="center">
      <Grid className={classes.logoutIcon} item>
        <ExitToAppIcon />
      </Grid>
      <AuthContext.Consumer>
        {(auth) => (
          <Grid
            className={classes.logoutText}
            item
            onClick={() => auth?.logout()}
          >
            Logout
          </Grid>
        )}
      </AuthContext.Consumer>
    </Grid>
  );
};

export default Logout;
