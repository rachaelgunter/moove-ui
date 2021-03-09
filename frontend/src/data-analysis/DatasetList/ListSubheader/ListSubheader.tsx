import React from 'react';
import {
  Grid,
  IconButton,
  ListSubheader as MuiListSubheader,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { FilterList as FilterListIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
  },
  gutters: {
    padding: theme.spacing(0, 3),
  },
  icon: {
    color: theme.palette.grey['500'],
  },
}));

const ListSubheader: React.FC = () => {
  const classes = useStyles();

  return (
    <MuiListSubheader
      component="div"
      classes={{
        root: classes.root,
        gutters: classes.gutters,
      }}
    >
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography color="textPrimary" variant="subtitle2">
            Active
          </Typography>
        </Grid>
        <Grid item>
          <IconButton>
            <FilterListIcon className={classes.icon} />
          </IconButton>
        </Grid>
      </Grid>
    </MuiListSubheader>
  );
};

export default ListSubheader;
