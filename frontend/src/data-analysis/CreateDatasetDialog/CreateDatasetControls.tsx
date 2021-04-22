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
    flexShrink: 0,
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

interface CreateDatasetControlsProps {
  handleDatasetCreation: () => void;
  handleClose: () => void;
}

const CreateDatasetControls: React.FC<CreateDatasetControlsProps> = ({
  handleDatasetCreation,
  handleClose,
}: CreateDatasetControlsProps) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(CreateDatasetContext);

  const isLastStep = state.currentStep === state.stepAmount - 1;
  const isFirstStep = state.currentStep === 0;

  const handleStepIncrease = () => {
    dispatch({
      currentStep: state.currentStep + 1,
    });
  };

  const handleStepDecrease = () => {
    dispatch({
      currentStep: state.currentStep - 1,
    });
  };

  const getPreviousButton = () => {
    if (state.creationTerminated) {
      return null;
    }

    return (
      <Button
        data-testid="create-dataset__button-previous"
        disabled={isFirstStep || state.loading}
        className={classes.dialogButton}
        onClick={handleStepDecrease}
      >
        Previous
      </Button>
    );
  };

  const getNextButton = () => {
    if (state.creationTerminated) {
      return null;
    }

    let buttonContent;
    if (state.loading) {
      buttonContent = <CircularProgress size="1em" />;
    } else if (!isLastStep) {
      buttonContent = 'Next';
    } else {
      buttonContent = 'Create';
    }

    return (
      <Button
        data-testid="create-dataset__button-next"
        disabled={state.pageHaveError || state.loading}
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
        disabled={state.loading}
        className={classes.dialogButton}
        onClick={handleClose}
      >
        {state.creationTerminated ? 'Close' : 'Cancel'}
      </Button>
      {getPreviousButton()}
      {getNextButton()}
    </Box>
  );
};

export default CreateDatasetControls;
