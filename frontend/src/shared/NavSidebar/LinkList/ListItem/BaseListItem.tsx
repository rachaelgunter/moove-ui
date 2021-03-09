import React, { ForwardedRef } from 'react';
import {
  ListItem as MuiListItem,
  ListItemProps as MuiListItemProps,
  makeStyles,
  Theme,
} from '@material-ui/core';

export type BaseListItemProps<
  C extends React.ElementType,
  D
> = MuiListItemProps<C, D>;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    whiteSpace: 'nowrap',
    '&$selected': {
      backgroundColor: 'inherit',
    },
  },
  gutters: {
    padding: theme.spacing(1, 3),
  },
  selected: {},
}));

const BaseListItem = React.forwardRef(
  <C extends React.ElementType>(
    {
      children,
      selected,
      ...otherProps
    }: BaseListItemProps<C, { component?: C }>,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const classes = useStyles();

    return (
      <MuiListItem
        button
        selected={selected}
        classes={{
          root: classes.root,
          selected: classes.selected,
          gutters: classes.gutters,
        }}
        ref={ref}
        {...otherProps}
      >
        {children}
      </MuiListItem>
    );
  },
);

export default BaseListItem;
