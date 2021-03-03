import { Button as MuiButton } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/styles';

const Button = withStyles(() =>
  createStyles({
    root: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 13,
      textTransform: 'capitalize',
    },
  }),
)(MuiButton);

export default Button;
