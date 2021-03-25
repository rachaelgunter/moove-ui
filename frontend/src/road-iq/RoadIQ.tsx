import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import PageTitle from 'src/shared/PageTemplate/PageTitle';
import routes from 'src/shared/routes';
import AuthContext from 'src/index';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
  },
  iframe: {
    border: 'none',
    height: '100%',
    width: '100%',
  },
  icon: {
    color: '#a0b3b2',
  },
  title: {
    fontSize: 18,
    fontWeight: theme.typography.fontWeightBold,
    textTransform: 'uppercase',
    marginLeft: theme.spacing(2),
    verticalAlign: 'middle',
  },
}));
const IFRAME_MESSAGE_NAME = 'message';
const LOGOUT_EVENT_NAME = 'logout';

const RoadIQ: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const onBackClick = () => {
    history.push(routes.dashboard.path);
  };

  useEffect(() => {
    const onMessageReceive = (event: MessageEvent) => {
      if (event?.data === LOGOUT_EVENT_NAME) {
        auth?.logout({
          returnTo: process.env.REACT_APP_AUTH0_LOGOUT_REDIRECT_URI,
        });
      }
    };

    window.addEventListener(IFRAME_MESSAGE_NAME, onMessageReceive, false);

    return () => {
      window.removeEventListener(IFRAME_MESSAGE_NAME, onMessageReceive, false);
    };
  }, [auth]);

  return (
    <div className={classes.root}>
      <PageTitle>
        <IconButton
          onClick={onBackClick}
          className={classes.icon}
          size="small"
          aria-label="delete"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          component="span"
          color="textPrimary"
          className={classes.title}
        >
          Road IQ
        </Typography>
      </PageTitle>
      <iframe
        className={classes.iframe}
        title="RoadIQ"
        src={process.env.REACT_APP_ROAD_IQ_URL}
        frameBorder="0"
      />
    </div>
  );
};

export default RoadIQ;
