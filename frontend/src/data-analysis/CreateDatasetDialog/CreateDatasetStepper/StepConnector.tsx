import {
  createStyles,
  StepConnector as MuiStepConnector,
  withStyles,
} from '@material-ui/core';

const StepConnector = withStyles(
  createStyles({
    line: {
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderTopStyle: 'solid',
      borderTopWidth: 2,
    },
  }),
)(MuiStepConnector);

export default StepConnector;
