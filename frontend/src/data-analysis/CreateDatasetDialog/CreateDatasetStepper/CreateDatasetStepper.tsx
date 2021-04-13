import React from 'react';
import { Step, StepLabel, Stepper } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import StepIcon from './StepIcon';
import StepConnector from './StepConnector';

interface CreateDatasetStepperProps {
  steps: Array<string>;
  currentStep: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.bg.lighter,
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
  },
}));

const CreateDatasetStepper: React.FC<CreateDatasetStepperProps> = ({
  steps,
  currentStep,
}: CreateDatasetStepperProps) => {
  const classes = useStyles();

  return (
    <Stepper
      classes={classes}
      connector={<StepConnector />}
      activeStep={currentStep}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CreateDatasetStepper;
