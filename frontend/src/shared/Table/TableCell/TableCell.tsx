import { TableCell as MuiTableCell, Theme } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/styles';

const TableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderColor: theme.palette.divider,
      fontSize: 13,
      width: '20%',

      '&:first-child': {
        paddingLeft: theme.spacing(3),
      },

      '&:last-child': {
        paddingRight: theme.spacing(3),
      },
    },
    head: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(1.5),
    },
    body: {
      padding: theme.spacing(1.25),
    },
    footer: {
      padding: theme.spacing(0.5),
      borderBottom: 'none',
    },
  }),
)(MuiTableCell);

export default TableCell;
