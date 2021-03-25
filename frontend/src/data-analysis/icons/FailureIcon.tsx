import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.common.white,
    position: 'relative',
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,

    '&::before': {
      position: 'absolute',
      content: '""',
      width: 24,
      height: 24,
      borderRadius: '100%',
      background: theme.palette.error.light,
    },
  },
}));

const FailureIcon: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <ErrorOutlineIcon fontSize="small" className={classes.root} />
    </div>
  );
};

export default FailureIcon;
