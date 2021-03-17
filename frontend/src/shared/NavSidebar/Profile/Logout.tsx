import { createStyles, Grid, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthContext from 'src/index';

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
  const auth = useContext(AuthContext);

  return (
    <Grid
      className={classes.root}
      container
      alignItems="center"
      onClick={() =>
        auth?.logout({
          returnTo: process.env.REACT_APP_AUTH0_LOGOUT_REDIRECT_URI,
        })
      }
    >
      <Grid className={classes.logoutIcon} item>
        <ExitToAppIcon />
      </Grid>
      <Grid className={classes.logoutText} item>
        Logout
      </Grid>
    </Grid>
  );
};

export default Logout;
