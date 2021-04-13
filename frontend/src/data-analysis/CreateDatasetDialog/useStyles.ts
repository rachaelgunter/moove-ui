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
  };
});
