import { makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';

interface ServerSideErrorProps {
  serverSideErrorText?: string;
}

const useStyles = makeStyles({
  gutterBottom: {
    marginBottom: '1em',
  },
});

const ServerSideError: FC<ServerSideErrorProps> = ({
  serverSideErrorText,
}: ServerSideErrorProps) => {
  const classes = useStyles();

  return serverSideErrorText?.length ? (
    <Typography
      className={classes.gutterBottom}
      variant="body2"
      color="error"
      gutterBottom
      align="center"
    >
      {serverSideErrorText}
    </Typography>
  ) : null;
};

ServerSideError.defaultProps = {
  serverSideErrorText: '',
};

export default ServerSideError;
