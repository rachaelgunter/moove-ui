import React, { useContext } from 'react';
import { Box, Button, CircularProgress, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontFamily } from 'src/app/styles/fonts';

import CreateDatasetContext from './CreateDatasetContext';

const useStyles = makeStyles((theme: Theme) => ({
  dialogControls: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: theme.spacing(6),
  },
  dialogButton: {
    fontFamily: FontFamily.ROBOTO,
    color: theme.palette.text.secondary,
    height: '36px',
    letterSpacing: '1.25px',
    marginLeft: theme.spacing(1),

    '&:disabled': {
      color: '#455a64',
    },
  },
}));

const CreateDatasetControls: React.FC = () => {
  const classes = useStyles();
  const {
    pageHaveError,
    creationTerminated,
    loading,
    currentStep,
    stepAmount,
    handleClose,
    handleDatasetCreation,
    handleStepChange,
  } = useContext(CreateDatasetContext);

  const isLastStep = currentStep === stepAmount - 1;
  const isFirstStep = currentStep === 0;

  const handleStepIncrease = () => {
    handleStepChange(currentStep + 1);
  };

  const handleStepDecrease = () => {
    handleStepChange(currentStep - 1);
  };

  const getPreviousButton = () => {
    if (creationTerminated) {
      return null;
    }

    return (
      <Button
        disabled={isFirstStep || loading}
        className={classes.dialogButton}
        onClick={handleStepDecrease}
      >
        Previous
      </Button>
    );
  };

  const getNextButton = () => {
    if (creationTerminated) {
      return null;
    }

    let buttonContent;
    if (loading) {
      buttonContent = <CircularProgress size="1em" />;
    } else if (!isLastStep) {
      buttonContent = 'Next';
    } else {
      buttonContent = 'Create';
    }

    return (
      <Button
        disabled={pageHaveError || loading}
        className={classes.dialogButton}
        onClick={isLastStep ? handleDatasetCreation : handleStepIncrease}
      >
        {buttonContent}
      </Button>
    );
  };

  return (
    <Box className={classes.dialogControls}>
      <Button
        disabled={loading}
        className={classes.dialogButton}
        onClick={handleClose}
      >
        {creationTerminated ? 'Close' : 'Cancel'}
      </Button>
      {getPreviousButton()}
      {getNextButton()}
    </Box>
  );
};

export default CreateDatasetControls;
