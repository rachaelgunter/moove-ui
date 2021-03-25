import { Box, makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';
import Typography from 'src/shared/Typography';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check.svg';

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

const CreateDatasetSuccessMessage: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CheckIcon />
      <Box className={classes.successMessage}>
        <Typography align="center">Dataset successfully imported</Typography>
      </Box>
      <Box className={classes.successMessageHint}>
        <Typography variant="body2" align="center">
          The ingestion process may take longer depending on the size of the
          imported data
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateDatasetSuccessMessage;
