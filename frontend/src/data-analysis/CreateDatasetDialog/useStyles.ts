import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontFamily } from 'src/app/styles/fonts';

export default makeStyles((theme: Theme) => {
  return {
    paper: {
      minHeight: 660,
      minWidth: 713,
      fontFamily: FontFamily.ROBOTO,
    },
    contentRoot: {
      padding: theme.spacing(0.5, 3, 0, 3),
      display: 'flex',
      flexDirection: 'column',
    },
    dialogTitleRoot: {
      padding: theme.spacing(3),
    },
    dialogTitle: {
      fontWeight: 400,
      fontSize: 20,
    },
    dialogButton: {
      fontFamily: FontFamily.ROBOTO,
      color: theme.palette.text.secondary,
      height: '36px',
      letterSpacing: '1.25px',
      marginLeft: theme.spacing(1),

      '&:disabled': {
        color: theme.palette.action.disabled,
      },
    },
  };
});
