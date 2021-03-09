import { Button as MuiButton, Theme } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/styles';

const Button = withStyles((theme: Theme) =>
  createStyles({
    root: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 13,
      textTransform: 'capitalize',

      '& svg': {
        fontSize: 13,
        marginLeft: theme.spacing(0.5),
      },
    },
  }),
)(MuiButton);

export default Button;
