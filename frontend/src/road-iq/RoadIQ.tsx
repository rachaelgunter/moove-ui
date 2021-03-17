import React from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import PageTitle from 'src/shared/PageTemplate/PageTitle';
import routes from 'src/shared/routes';

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

const RoadIQ: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const onBackClick = () => {
    history.push(routes.dashboard);
  };

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
