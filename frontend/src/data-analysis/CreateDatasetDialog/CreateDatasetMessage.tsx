import { Box, makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';
import Typography from 'src/shared/Typography';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check.svg';

export interface CreateDatasetMessageProps {
  Icon: FC;
  message: string;
  messageHint: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '665px',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  },
  successMessage: {
    margin: '19px 0 23px 0',
    maxWidth: theme.spacing(45),
  },
  successMessageHint: {
    maxWidth: theme.spacing(45),
  },
}));

const CreateDatasetMessage: FC<CreateDatasetMessageProps> = ({
  Icon = CheckIcon,
  message,
  messageHint,
}: CreateDatasetMessageProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Icon />
      <Box className={classes.successMessage}>
        <Typography align="center">{message}</Typography>
      </Box>
      <Box className={classes.successMessageHint}>
        <Typography variant="body2" align="center">
          {messageHint}
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateDatasetMessage;
